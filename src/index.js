#!/usr/bin/env node

import process from "node:process";
import { parseArgs, styleText } from "node:util";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function getArgs() {
  /**
   * @type {import("node:util").ParseArgsConfig["options"]}
   */
  const OPTIONS = {
    help: { type: "boolean", short: "h" },
    version: { type: "boolean", short: "v" },
    githooks: { type: "boolean" },
  };

  let args;
  try {
    args = parseArgs({ allowPositionals: true, options: OPTIONS });
  } catch (e) {
    console.error(e.message);
    process.exit(0);
  }

  const { positionals, values: options } = args;
  const totalArgs = Object.keys(options).length;
  const noParams = process.argv.length === 2;
  const isCommand = positionals.length === 1;

  return {
    help: Boolean(noParams || options.help),
    version: Boolean(totalArgs === 1 && options.version),
    githooks: isCommand && positionals.includes("githooks"),
  };
}

// https://raw.githubusercontent.com/{user}/{repo}/{branch}/{path}
const REGISTRY_URL =
  "https://raw.githubusercontent.com/moaqz/config/main/config";
const REGISTRY_FILE = "registry.json";
const VERSION = "0.0.1";

const parsedArgs = getArgs();

if (parsedArgs.help) {
  console.log(
    `${styleText("green", `moaqz-tools:${VERSION}`)} - by moaqz (${styleText("magenta", "https://github.com/moaqz")})\n`,
  );

  console.log(
    `Usage: moaqz-tools [options] [command]\n\n` +
      `Options:\n` +
      `  -h, --help         Show this help message\n` +
      `  -v, --version      Show version information\n` +
      `\nCommands:\n` +
      `  githooks           Configure Git hooks using Lefthook\n`,
  );

  process.exit(0);
}

if (parsedArgs.version) {
  console.log(VERSION);
  process.exit(0);
}

async function getRegistry() {
  const url = `${REGISTRY_URL}/${REGISTRY_FILE}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to retrieve registry");
    }

    return res.json();
  } catch (e) {
    console.log(e.message);
    process.exit(0);
  }
}

/**
 * @param {string} fileName
 * @returns {Promise<string>}
 */
async function getRegistryFile(fileName) {
  const url = `${REGISTRY_URL}/${fileName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to retrieve file from registry");
    }

    return res.text();
  } catch (e) {
    console.log(e.message);
    process.exit(0);
  }
}

function readPackageJSON() {
  const fullPath = path.resolve("package.json");

  try {
    const file = readFileSync(fullPath, "utf8");
    return JSON.parse(file);
  } catch (e) {
    console.log(e.message);
    process.exit(0);
  }
}

/**
 * @param {string} filename
 * @param {string} data
 */
function writeFile(filename, data) {
  const file = path.resolve(filename);
  writeFileSync(file, data, { encoding: "utf8" });
}

if (parsedArgs.githooks) {
  console.log(styleText("yellow", "[1/3] Fetching registry configuration..."));
  const registry = (await getRegistry())["lefthook"];

  console.log(styleText("yellow", "[2/3] Updating package.json..."));
  const pkgJSON = readPackageJSON();
  const updatedPkgJSON = {
    ...pkgJSON,
    devDependencies: {
      ...registry.dependencies,
      ...pkgJSON.devDependencies,
    },
  };

  writeFile("package.json", JSON.stringify(updatedPkgJSON, null, 2));

  console.log(styleText("yellow", "[3/3] Writing configuration files..."));
  for (const file of registry.files) {
    const fileContent = await getRegistryFile(file);
    writeFile(file, fileContent);
  }

  console.log(
    styleText(
      "green",
      "[DONE] Run the following commands to complete the setup:\n\n" +
        "  pnpm install\n" +
        "  pnpm lefthook install\n",
    ),
  );
}
