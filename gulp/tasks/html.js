/*
 * Node Dependencies
 */
var Colors = require("colors");
var Gulp = require("gulp");
var Replace = require("gulp-replace-task");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var replace = require("../modules/replace");
var paths = require("../modules/paths");

/*
 * Internal functions
 */
function onTaskComplete(callback)
{
  console.log(Colors.green.underline('"html" task completed successfully!'));
  global.browserSync.reload();
  callback();
}

/*
 * Task
 */
Gulp.task("html", function(callback) {

  var destination;

  destination = (argv.mode === "distributable") ? config.common.paths.builds.html[argv.mode][argv.env] : config.common.paths.builds.html[argv.mode];
  Gulp
    .src(paths.relocate(config.common.paths.sources.html.default))
    .pipe(Replace({ patterns: replace.patterns.common }))
    .pipe(Replace({ patterns: replace.patterns[argv.env] }))
    .pipe(Gulp.dest(paths.relocate(destination)))
      .on("end", onTaskComplete.bind(null, callback));
});
