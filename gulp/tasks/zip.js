/*
 * Dependencies
 */
var Gulp = require("gulp");
var Zip = require("gulp-zip");

/*
 * Modules
 */
var paths = require("../modules/paths");

/*
 * Task
 */
Gulp.task("zip", function() {

  var buildData,
      filename;

  buildData = require(paths.relocate("dist/build.json"));
  filename = `${buildData.name}_${buildData.env}_${buildData.date}.zip`;
  return Gulp
    .src(paths.relocate("dist"))
    .pipe(Zip(filename))
    .pipe(Gulp.dest(paths.relocate("./")));
});
