/*
 * Dependencies
 */
var Colors = require("colors/safe");
var VinylFTP = require("vinyl-ftp");
var Gulp = require("gulp");


/*
 * Configuration
 */
var config = require("../../config/tasks/ftp.json");


/*
 * Modules
 */
var paths = require("../modules/paths");


/*
 * Internal functions
 */
function onTaskError(callback, err)
{
  console.log(Colors.red.underline('"ftp" task failed!'));
  console.log(err.name + ": " + err.message);
  callback(err);
}
function onTaskComplete(callback)
{
  console.log(Colors.green.underline('"ftp" task completed successfully!'));
  global.browserSync.reload();
  callback();
}


/*
 * Task
 */
Gulp.task("ftp", function(callback) {

  var connection,
      source;

  connection = new VinylFTP({
    host: config.host,
    user: config.username,
    pass: config.password,
    log: console.log
  });
  source = paths.relocate(config.localRoot);
  Gulp
    .src(source + "/**", { base: source, buffer: false })
    .on("error", onTaskError.bind(null, callback))
    .pipe(connection.newer(config.remoteRoot))
    .on("error", onTaskError.bind(null, callback))
    .pipe(connection.dest(config.remoteRoot))
    .on("error", onTaskError.bind(null, callback))
    .on("end", onTaskComplete.bind(null, callback));
});
