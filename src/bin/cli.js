#!/usr/bin/env node

const usage = require('../usages/default');
const argv = usage.argv;
const cmd = argv._[0];
const script = `../scripts/${cmd}`;

require(script);
