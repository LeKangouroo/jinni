#!/usr/bin/env node
const usage = require('../usages/default');
const argv = usage.argv;
const cmd = argv._[0];
const pkg = require('../../package.json');
const script = `../scripts/${cmd}`;

if (argv.version)
{
  console.log(`${pkg.name} v${pkg.version}`);
  process.exit(0);
}
require(script);
