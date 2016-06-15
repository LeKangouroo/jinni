/*
 * Node Dependencies
 */
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
var tasks = require("../modules/tasks");

/*
 * Task
 */
Gulp.task("jade", function(callback) {

  var cfg;

  cfg = config.nodeModules.jade;
  cfg.locals = { BUILD_MODE: argv.mode };
  Gulp
    .src(paths.relocate(config.common.paths.sources.jade.default))
      .on("error", tasks.error.bind(null, "jade", callback))
    .pipe(Jade(cfg))
      .on("error", tasks.error.bind(null, "jade", callback))
    .pipe(Replace({ patterns: replace.patterns.common }))
      .on("error", tasks.error.bind(null, "jade", callback))
    .pipe(Replace({ patterns: replace.patterns[argv.env] }))
      .on("error", tasks.error.bind(null, "jade", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on("error", tasks.error.bind(null, "jade", callback))
      .on("end", tasks.success.bind(null, "jade", callback));
});
