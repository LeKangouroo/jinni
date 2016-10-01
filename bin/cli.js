#!/usr/bin/env node

var argv,
    cmd;

argv = require('../usages/default').argv;
cmd = argv[0];
switch (cmd)
{
  case 'init':
    require('../scripts/init');
  default:
    return
}
console.log("hello world");
console.log(argv);
