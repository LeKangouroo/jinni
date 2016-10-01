/*
 * Node Dependencies
 */
var Gulp = require("gulp");
var Replace = require("gulp-replace-task");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../../config/config");
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Internal Functions
 */
function onTaskComplete(gulpCallback)
{
  global.browserSync.reload();
  gulpCallback();
}

/*
 * Task
 */
Gulp.task("html", function(callback) {

  Gulp
    .src(paths.relocate(config.common.paths.sources.html.default))
      .on("error", tasks.error.bind(null, "html", callback))
    .pipe(Replace({ patterns: config.common.replacements.patterns.common }))
      .on("error", tasks.error.bind(null, "html", callback))
    .pipe(Replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on("error", tasks.error.bind(null, "html", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on("error", tasks.error.bind(null, "html", callback))
      .on("end", tasks.success.bind(null, "html", onTaskComplete.bind(null, callback)));
});
