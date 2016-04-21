/*
 * Node Dependencies
 */
var Colors = require("colors/safe");
var Gulp = require("gulp");
var JSHint = require("gulp-jshint");
var JSHintStylish = require("jshint-stylish");
var Replace = require("gulp-replace-task");
var RunSequence = require("run-sequence").use(Gulp);
var Webpack = require("webpack");
var WebpackStream = require("webpack-stream");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");
var replace = require("../modules/replace");

/*
 * Internal functions
 */
function onTaskError(callback, err)
{
  console.log(Colors.red.underline('"javascript" task failed!'));
  console.log(err.name + ": " + err.message);
  callback(err);
}
function onTaskComplete(callback)
{
  console.log(Colors.green.underline('"javascript" task completed successfully!'));
  global.browserSync.reload();
  callback();
}

/*
 * Task
 */
Gulp.task("javascript", function(callback) {

  RunSequence("javascript-lint", "javascript-build", function() {

    global.browserSync.reload();
    onTaskComplete(callback);
  });
});
Gulp.task("javascript-build", function(callback) {

  var destination;

  destination = (argv.mode === "distributable") ? config.common.paths.builds.js[argv.mode][argv.env] : config.common.paths.builds.js[argv.mode];
  return WebpackStream(config.nodeModules.webpack(), Webpack)
      .on("error", onTaskError.bind(null, callback))
    .pipe(Replace({ patterns: replace.patterns.common }))
      .on("error", onTaskError.bind(null, callback))
    .pipe(Replace({ patterns: replace.patterns[argv.env] }))
      .on("error", onTaskError.bind(null, callback))
    .pipe(Gulp.dest(paths.relocate(destination)));
});
Gulp.task("javascript-lint", function(callback) {

  return Gulp
    .src(paths.relocate(config.common.paths.sources.js.default))
    .pipe(JSHint(config.nodeModules.jshint))
      .on("error", onTaskError.bind(null, callback))
    .pipe(JSHint.reporter(JSHintStylish))
      .on("error", onTaskError.bind(null, callback));
});
