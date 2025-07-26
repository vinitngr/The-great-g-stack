> **Note:** This package is under active development.  
> **Temporary Access Credentials:**  
> &nbsp;&nbsp;&nbsp;&nbsp;• `username`: `vinit`  
> &nbsp;&nbsp;&nbsp;&nbsp;• `token`: `mysecrettoken123`  
> **Important:** Review `setup.sh` carefully before executing.

# @theggs/cli

A simple CLI to import and export stack templates from **theggs**.

## 📦 Installation

```bash
npm install -g @theggs/cli
```

## 🚀 Usage

```bash
tggs <url> --dir=target-directory
tggs export --dir=target-directory
```

## 🔧 Options

| Option   | Alias | Description                             | Default           |
|----------|-------|-----------------------------------------|-------------------|
| --dir    | -d    | Directory to extract or export files to | Current directory |

## 📁 Examples

**Import a stack:**

```bash
tggs https://tggs.vinitnagar56.workers.dev/api/stack/e427a421d151 --dir=./my-stack
```

**Export a stack:**

```bash
tggs export --dir=./my-stack
```

## 🌐 About

tggs (The Great Goat Stack) is a tool for defining and sharing complete tech stacks — including frontend, backend, database, and devtools — via reusable templates.  
This CLI allows developers to easily import or export stack configurations locally.

## 🪪 License

MIT
