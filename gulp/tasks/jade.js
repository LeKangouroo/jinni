/*
 * Node Dependencies
 */
var Colors = require("colors");
var Gulp = require("gulp");
var Jade = require("gulp-jade");
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
function onJadeError(callback, err)
{
  console.log(Colors.red.underline('"jade" task failed!'));
  console.log(err.message);
  callback(err);
}
function onTaskComplete(callback)
{
  console.log(Colors.green.underline('"jade" task completed successfully!'));
  global.browserSync.reload();
  callback();
}

/*
 * Task
 */
Gulp.task("jade", function(callback) {

  var destination;

  destination = (argv.mode === "distributable") ? config.common.paths.builds.html[argv.mode][argv.env] : config.common.paths.builds.html[argv.mode];
  Gulp
    .src(paths.relocate(config.common.paths.sources.jade.default))
    .pipe(Jade(config.nodeModules.jade))
      .on("error", onJadeError.bind(null, callback))
    .pipe(Replace({ patterns: replace.patterns.common }))
    .pipe(Replace({ patterns: replace.patterns[argv.env] }))
    .pipe(Gulp.dest(paths.relocate(destination)))
      .on("end", onTaskComplete.bind(null, callback));
});
