/*
 * Dependencies
 */
var Colors = require("colors/safe");
var Gulp = require("gulp");
var JSONFile = require("jsonfile");
var Package = require("../../package.json");
var RunSequence = require("run-sequence");

/*
 * Modules
 */
var argv = require("../modules/argv");
var paths = require("../modules/paths");

/*
 * Task
 */
Gulp.task("build", function(callback) {

  return RunSequence(["sass", "svg", "html", "jade", "javascript", "static", "images"], function() {

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
        console.log("❗  " + Colors.bold.red("Couldn't write the following file: ") + buildDataFile);
        console.log(err);
      }
      else
      {
        console.log("👍  " + Colors.bold.green("Completed successfully! Your build is available in the following directory: ") + paths.relocate("dist"));
      }
      callback();
    });
  });
});
