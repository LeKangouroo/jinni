/*
 * Dependencies
 */
var Colors = require("colors/safe");
var GulpUtil = require("gulp-util");

module.exports = {
  
  log: function() {

    GulpUtil.log.apply(null, arguments);
  },
  error: function(msg) {

    this.log(Colors.red("[ERROR] " + msg));
  },
  info: function(msg) {

    this.log(Colors.cyan("[INFO] " + msg));
  },
  raw: function() {
    
    console.log.apply(null, arguments);
  },
  success: function(msg) {

    this.log(Colors.green("[SUCCESS] " +  msg));
  },
  trace: function(err) {
    
    console.trace(err);
  },
  warning: function(msg) {

    this.log(Colors.yellow("[WARNING] " + msg));
  }
};