/*
 * Node Dependencies
 */
var Gulp = require("gulp");

/*
 * Modules
 */
var config = require("../modules/config");
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Tasks
 */
Gulp.task("static", function(callback) {

  var options,
      source;

  options = {
    base: paths.relocate(config.common.paths.static.base)
  };
  source = paths.relocate(config.common.paths.static.source);
  Gulp
    .src(source, options)
      .on("error", tasks.error.bind(null, "static", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.static.destination)))
      .on("error", tasks.error.bind(null, "static", callback))
      .on("end", tasks.success.bind(null, "static", callback));
});
