import inquirer from "inquirer";
import { steps } from "./steps.js";

const allowedFields = [
  "id", "name", "version", "must", "description", "category",
  "love", "hate", "package", "options", "service"
];

function getOptionDisplayName(opt) {
  if (!opt) return "Invalid option";
  return opt.name || opt.id || opt.title || "Unnamed option";
}

async function showFieldValues(options, field, parentName = "") {
  if (!options || !Array.isArray(options)) {
    console.log("No options available.");
    return;
  }

  const values = [];
  for (const opt of options) {
    if (opt[field] !== undefined) {
      if (Array.isArray(opt[field])) {
        values.push(...opt[field]);
      } else {
        values.push(opt[field]);
      }
    }
  }

  if (values.length === 0) {
    console.log(`\nNo ${field} values found in ${parentName || "these options"}\n`);
  } else {
    console.log(`\n${field} values for ${parentName || "current options"}:\n`);
    values.forEach((v, i) => console.log(`${i + 1}. ${v}`));
    console.log("");
  }
}

async function exploreOptions(options, path = []) {
  if (!options || !Array.isArray(options) || options.length === 0) {
    console.log("No options available at this level.");
    return;
  }

  const validOptions = options.filter(opt => opt && (opt.id || opt.name || opt.title));

  if (validOptions.length === 0) {
    console.log("No valid options found at this level.");
    return;
  }

  try {
    // First ask if they want to see all names or select specific option
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: `What would you like to do? (Path: ${path.join(" > ") || "root"})`,
        choices: [
          { name: "Show all names at this level", value: "showNames" },
          { name: "Select specific option to explore", value: "select" },
          { name: "Go back", value: "back" }
        ]
      }
    ]);

    if (action === "back") return;
    
    if (action === "showNames") {
      await showFieldValues(validOptions, "name", path[path.length - 1] || "root");
      return exploreOptions(validOptions, path);
    }

    // If selecting specific option
    const { selectedOption } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedOption",
        message: "Select an option:",
        choices: validOptions.map(opt => ({
          name: `${getOptionDisplayName(opt)}${opt.options ? " (has nested options)" : ""}`,
          value: opt
        }))
      }
    ]);

    // If selected option has nested options, ask which field to show
    if (selectedOption.options && selectedOption.options.length > 0) {
      const { field } = await inquirer.prompt([
        {
          type: "list",
          name: "field",
          message: `What field would you like to see for options in "${getOptionDisplayName(selectedOption)}"?`,
          choices: allowedFields
        }
      ]);
      
      await showFieldValues(selectedOption.options, field, getOptionDisplayName(selectedOption));
      return exploreOptions(selectedOption.options, [...path, getOptionDisplayName(selectedOption)]);
    }

    // If no nested options, show fields of current option
    const { field } = await inquirer.prompt([
      {
        type: "list",
        name: "field",
        message: `What field would you like to see for "${getOptionDisplayName(selectedOption)}"?`,
        choices: allowedFields
      }
    ]);

    console.log(`\n${field} for "${getOptionDisplayName(selectedOption)}":`);
    if (Array.isArray(selectedOption[field])) {
      selectedOption[field].forEach((v, i) => console.log(`${i + 1}. ${v}`));
    } else {
      console.log(selectedOption[field] || "(not set)");
    }
    console.log("");

    return exploreOptions(validOptions, path);
  } catch (error) {
    console.error("\nAn error occurred:", error.message);
    return exploreOptions(validOptions, path);
  }
}

async function run() {
  console.log("Interactive Step Options Explorer\n");

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    console.error("No steps data found or invalid format.");
    return;
  }

  const validSteps = steps.filter(step => step && step.title && step.options);

  if (validSteps.length === 0) {
    console.error("No valid sections found in steps data.");
    return;
  }

  try {
    const { section } = await inquirer.prompt([
      {
        type: "list",
        name: "section",
        message: "Select a section:",
        choices: validSteps.map(s => ({
          name: s.title,
          value: s
        }))
      }
    ]);

    await exploreOptions(section.options, [section.title]);
  } catch (error) {
    console.error("\nAn error occurred:", error.message);
  }
}

run().catch(console.error);