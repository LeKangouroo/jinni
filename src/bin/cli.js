#!/usr/bin/env node

var argv = require('../usages/default').argv;

var cmd = argv._[0];

require('../scripts/' + cmd);
