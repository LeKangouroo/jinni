/*
 * Dependencies
 */
var Colors = require("colors/safe");
var Gulp = require("gulp");
var RunSequence = require("run-sequence");

/*
 * Modules
 */
var paths = require("../modules/paths");

/*
 * Task
 */
Gulp.task("build", function(callback) {

  return RunSequence(["sass", "svg", "html", "jade", "javascript", "static", "images"], function() {

    callback();
    console.log("👍  " + Colors.bold.green("Completed successfully! Your build is available in the following directory: ") + paths.relocate("dist"));
  });
});
