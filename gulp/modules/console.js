/*
 * Dependencies
 */
var chalk = require('chalk');
var GulpUtil = require("gulp-util");

module.exports = {

  log: function() {

    GulpUtil.log.apply(null, arguments);
  },
  error: function(msg) {

    this.log(chalk.red("[ERROR] " + msg));
  },
  info: function(msg) {

    this.log(chalk.blue("[INFO] " + msg));
  },
  raw: function() {

    console.log.apply(null, arguments);
  },
  success: function(msg) {

    this.log(chalk.green("[SUCCESS] " +  msg));
  },
  trace: function(err) {

    console.trace(err);
  },
  warning: function(msg) {

    this.log(chalk.yellow("[WARNING] " + msg));
  }
};
