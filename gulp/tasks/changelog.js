/*
 * Node Dependencies
 */
var Gulp = require("gulp");

/*
 * Modules
 */
var argv = require("../modules/argv");
var c = require("../modules/console");
var git = require("../modules/git");
var tasks = require("../modules/tasks");

/*
 * Tasks
 */
Gulp.task("changelog", function(callback) {

  var options;

  options = { start: argv.start, end: argv.end || "HEAD" };
  git.changelog(options).then(
    function(outputString) {

      c.raw("\n\n\nCHANGELOG (" + new Date().toUTCString() + "):\n");
      c.raw(outputString);
    },
    function(err) {
      
      tasks.error.call(null, "changelog", callback, err);
    }
  );
});
