/*
 * Dependencies
 */
var Gulp = require("gulp");
var JSONFile = require("jsonfile");
var Package = require("../../package.json");
var RunSequence = require("run-sequence");

/*
 * Modules
 */
var argv = require("../modules/argv");
var c = require("../modules/console");
var paths = require("../modules/paths");

/*
 * Task
 */
Gulp.task("build", function(callback) {

  return RunSequence(["sass", "svg", "html", "jade", "javascript", "static", "images", "todos"], function() {

    var buildData,
        buildDataFile;

    buildData = {
      date: new Date().toISOString(),
      env:  argv.env,
      name: Package.name
    };
    buildDataFile = paths.relocate("dist/build.json");
    JSONFile.writeFile(buildDataFile, buildData, function(err) {

      if (err)
      {
        c.error("❗  Couldn't write the following file: " + buildDataFile);
        c.trace(err);
      }
      else
      {
        c.success("👍  Completed successfully! Your build is available in the following directory: " + paths.relocate("dist"));
      }
      callback();
    });
  });
});
