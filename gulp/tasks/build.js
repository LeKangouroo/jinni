/*
 * Node Dependencies
 */
var Gulp = require("gulp");
var RunSequence = require("run-sequence");

/*
 * Modules
 */
var argv = require("../modules/argv");

/*
 * Task
 */
Gulp.task("build", function(callback) {

  return RunSequence(["sass", "svg", "html", "jade", "javascript", "static", "images"], callback);
});
