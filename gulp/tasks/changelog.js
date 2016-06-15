/*
 * Node Dependencies
 */
var Exec = require("child_process").exec;
var Gulp = require("gulp");

/*
 * Modules
 */
var argv = require("../modules/argv");
var c = require("../modules/console");
var tasks = require("../modules/tasks");

/*
 * Tasks
 */
Gulp.task("changelog", function(callback) {

  var cmd,
      commitHashEnd,
      commitHashStart;
  
  if (!argv.start)
  {
    tasks.error.call(null, "changelog", callback, new Error("missing start commit ID (use npm run chlg -- --start=<commit-id>)"));
    return;
  }
  commitHashStart = argv.start;
  commitHashEnd = argv.end || "HEAD";
  cmd = 'git log --pretty="format:%aN: %s (commit #%h)" --reverse ' + commitHashStart + '..' + commitHashEnd;
  Exec(cmd, function(err, stdout) {
    
    if (err)
    {
      tasks.error.call(null, "changelog", callback, err);
    }
    else
    {
      c.raw("\n\n\nCHANGELOG (" + new Date().toUTCString() + "):\n");
      c.raw(stdout);
    }
  });
});
