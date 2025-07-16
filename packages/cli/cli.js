#!/usr/bin/env node
/* eslint-disable no-console */

import { runMain, defineCommand } from "citty";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

const REGISTRY = {
  /**
   * https://raw.githubusercontent.com/{user}/{repo}/{branch}/{path}
   */
  url: "https://raw.githubusercontent.com/moaqz/config/main/packages/registery",
  file: "registry.json",
};

/**
 * @param {string} fileName
 */
async function getRegistryFile(fileName) {
  const url = `${REGISTRY.url}/${fileName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to retrieve file from registry");
    }

    if (fileName.endsWith(".json")) {
      return res.json();
    }

    return res.text();
  } catch (e) {
    console.error(e.message);
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

const main = defineCommand({
  meta: {
    name: "moaqz-config",
  },
  args: {
    linter: {
      type: "boolean",
      description: "Include ESLint configuration",
    },
    githooks: {
      type: "boolean",
      description: "Set up Git hooks with Lefthook",
    }
  },
  async run({ args }) {
    const registryIndex = await getRegistryFile(REGISTRY.file);
    const pkg = await readPackageJSON();

    const selectedArgs = Object
      .entries(args)
      .filter(([key, enabled]) => key !== "_" && enabled === true);

    if (selectedArgs.length === 0) {
      console.log(`${styleText("yellow", "No options selected. Exiting...")}`);
      return;
    }

    let modifiedPackageJSON = false;

    for (const [key,] of selectedArgs) {
      const item = registryIndex[key];
      if (!item) {
        console.warn(`${styleText("yellow", "⚠ No registry entry for")} "${key}"`);
        continue;
      }

      console.log(`\n📦 Installing ${styleText("bold", `"${key}"`)}...`);

      // Copy required files.
      if (item.files) {
        for (const file of item.files) {
          const content = await getRegistryFile(file);
          const localPath = path.resolve(file);

          mkdirSync(path.dirname(localPath), { recursive: true });
          writeFileSync(localPath, content, "utf8");
          console.log(`${styleText("green", "✔")} Downloaded: ${styleText("cyan", file)}`);
        }
      }

      // Include scripts.
      if (item.scripts) {
        pkg.scripts = {
          ...pkg.scripts,
          ...item.scripts
        };

        modifiedPackageJSON = true;
        console.log(`${styleText("green", "✔")} Scripts added to ${styleText("bold", "package.json")}`);
      }

      // Install dependencies.
      if (item.dependencies) {
        pkg.devDependencies = {
          ...pkg.devDependencies,
          ...item.dependencies
        };

        modifiedPackageJSON = true;
        console.log(`${styleText("green", "✔")} DevDependencies added to ${styleText("bold", "package.json")}`);
      }
    }

    if (modifiedPackageJSON) {
      writeFileSync(
        path.resolve("package.json"),
        JSON.stringify(pkg, null, 2)
      );

      console.log(`\n${styleText("bold", "📦 package.json updated.")}`);
      console.log(`👉 Run ${styleText("cyan", "pnpm install")} to install new dependencies.`);
    }

    if (args.githooks) {
      console.log(`👉 Run ${styleText("cyan", "pnpm lefthook install")} to setup the githooks.`);
    }
  }
});

runMain(main);
