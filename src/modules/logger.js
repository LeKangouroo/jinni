var chalk = require('chalk');

module.exports = {

  log: function() {

    console.log.apply(null, arguments);
  },
  error: function(msg) {

    this.log(chalk.red("[ERROR] " + msg));
  },
  info: function(msg) {

    this.log(chalk.blue("[INFO] " + msg));
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
