/*
 * Node Dependencies
 */
var Del = require("del");
var Errno = require("errno");
var Gulp = require("gulp");

/*
 * Modules
 */
var argv = require("../modules/argv");
var c = require("../modules/console");
var config = require("../modules/config");
var paths = require("../modules/paths");

/*
 * Internal functions
 */
function onCleanError(callback, err)
{
  c.error('"clean" task failed!');
  c.log("\t- Path: " + err.path);
  c.log("\t- Cause: " + Errno.code[err.code].description);
  c.trace(err);
  callback(err);
}
function onCleanSuccess(callback, deletedItems)
{
  c.success('"clean" task completed successfully!');
  if (deletedItems.length > 0)
  {
    c.info("Deleted items:");
    deletedItems.forEach(function(filePath){
      c.log(filePath);
    });
  }
  callback();
}

/*
 * Task
 */
Gulp.task("clean", function(callback) {

  var targets = paths.relocate(config.tasks.clean.paths[argv.mode]);
  var options = {force: true};

  Del(targets, options).then(
    onCleanSuccess.bind(null, callback),
    onCleanError.bind(null, callback)
  );
});
