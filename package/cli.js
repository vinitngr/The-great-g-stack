#!/usr/bin/env node

import meow from "meow";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import { globby } from "globby";
import FormData from "form-data";
import pc from "picocolors";
import ora from "ora";
import enquirer from "enquirer";
import { join } from "path";
const { prompt } = enquirer;

const cli = meow(
  `
  Usage:
    $ tggs <url> --dir=target-directory

  Options:
    --dir, -d  Directory to extract files into [default: current directory]
`,
  {
    importMeta: import.meta,
    flags: {
      dir: {
        type: "string",
        shortFlag: "d",
        default: process.cwd(),
      },
    },
  }
);

const dir = cli.flags.dir;

const configDir = process.env.TGGSCONFIG_DIR || path.join(os.homedir(), ".tggs-cli");
const tggsFile = path.join(configDir, "tggs.txt");


async function getAuth() {
  try {
    if (fs.existsSync(tggsFile)) {
      const content = fs.readFileSync(tggsFile, "utf-8").trim();
      if (content) return JSON.parse(content);
    }
  } catch (e) {
    console.log(e);
  }

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true, mode: 0o700 });
  }

  const response = await prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your username:",
    },
    {
      type: "password",
      name: "token",
      message: "Enter your token:",
    },
  ]);

  fs.writeFileSync(tggsFile, JSON.stringify(response), {
    encoding: "utf-8",
    mode: 0o600,
  });

  return response;
}

async function generateSetupFiles(fullDir, customIgnore = []) {
  const filePaths = await globby(["**/*"], {
    cwd: fullDir,
    dot: true,
    onlyFiles: true,
    gitignore: true,
    ignore: ["node_modules", ...customIgnore],
  });

  let setupScript = "#!/bin/sh\n";
  for (const file of filePaths) {
    if (file === "package.json") continue;
    const filePath = join(fullDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    setupScript += `mkdir -p "$(dirname "${file}")"\n`;
    setupScript += `cat << 'EOF' > "${file}"\n${content}\nEOF\n\n`;
  }

  let packageJsonContent;
  try {
    packageJsonContent = fs.readFileSync(join(fullDir, "package.json"), "utf8");
  } catch (e) {
    throw new Error("package.json is required but was not found");
  }
  return {
    "setup.sh": setupScript,
    "package.json": packageJsonContent,
  };
}

async function sendToServer(folderPath, headers, spinner) {
  spinner.start("Generating setup files...");
  const body = { files: await generateSetupFiles(folderPath) };

  fs.mkdirSync('out', { recursive: true });
  fs.writeFileSync('out/setup.sh', body.files['setup.sh']);
  fs.writeFileSync('out/package.json', body.files['package.json']);
  spinner.succeed("Generated out/setup.sh and out/package.json");

  spinner.start("Uploading stack...");
  const res = await fetch("https://tggs.vinitnagar56.workers.dev/api/uploadstack?type=private", {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  if (!res.ok) {
    spinner.fail("Upload failed");
    throw new Error(`Upload failed: ${res.statusText}`);
  }
  spinner.succeed("Stack uploaded successfully");
  return res.json();
}


(async () => {
  try {
    const spinner = ora();

    spinner.start("Getting auth...");
    spinner.stop();

    const auth = await getAuth();
    spinner.succeed("Auth loaded.");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
      "X-Username": auth.username,
    };

    spinner.start("Fetching stack data...");
    const command = cli.input[0];

    if (command === "export") {

      try {
        const res = await sendToServer(cli.flags.dir || ".", headers, spinner);
        spinner.succeed("Stack exported successfully.");
        console.log(pc.green(JSON.stringify(res, null, 2)));
        process.exit(0);
      } catch (err) {
        spinner.fail("Export failed.");
        console.error(pc.red(err.message));
        process.exit(1);
      }
    } else if (command && command.startsWith("http")) {
      const url = cli.input[0];

      if (!url.startsWith("https://tggs.vinitnagar56.workers.dev/api/stack")) {
        console.error(pc.red("❌ Invalid URL"));
        process.exit(1);
      }

      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);

      spinner.succeed("Fetched stack data.");
      const files = await res.json();

      if (files["setup.sh"]) {
        const setupPath = path.join(dir, "setup.sh");
        fs.writeFileSync(setupPath, files["setup.sh"]);
        spinner.succeed("setup.sh saved, run manually.");
      }

      if (files["package.json"]) {
        fs.writeFileSync(path.join(dir, "package.json"), files["package.json"]);
        console.log("📦 package.json saved.");
      }

      console.log(pc.green("✅ Setup complete in:"), dir);
    } else {
      console.error("Invalid command or URL");
      process.exit(1);
    }
  } catch (err) {
    console.error(pc.red("❌ Unexpected error:"), err.message);
    process.exit(1);
  }
})();
