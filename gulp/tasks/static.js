/*
 * Node Dependencies
 */
var Gulp = require("gulp");

/*
 * Modules
 */
var config = require("../modules/config");
var paths = require("../modules/paths");

/*
 * Tasks
 */
Gulp.task("static", function() {

  var options,
      source;

  options = {
    base: paths.relocate(config.common.paths.static.base)
  };
  source = paths.relocate(config.common.paths.static.source);
  return Gulp
    .src(source, options)
    .pipe(Gulp.dest(paths.relocate(config.common.paths.static.destination)));
});
