#!/usr/bin/env node
import fs from "fs";
import path from "path";
import usage from "../usages/default.js";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const pkgPath = path.join(currentFilePath, "..", "..", "..", "package.json");
const pkg = fs.readFileSync(pkgPath, "utf8");
const argv = usage.argv;
const cmd = (typeof argv._[0] === 'string') ? argv._[0] : null;

if (argv.version)
{
  console.log(`${pkg.name} v${pkg.version}`);
  process.exit(0);
}
if (!cmd)
{
  usage.showHelp();
  process.exit(1);
}
import(`../scripts/${cmd}.js`);
