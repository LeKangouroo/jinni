/*
 * Node Dependencies
 */
var Del = require("del");
var Gulp = require("gulp");
var SvgSprite = require("gulp-svg-sprite");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Internal functions
 */
function onTaskComplete(callback)
{
  tasks.success("svg", callback);
  global.browserSync.reload();
}

/*
 * Task
 */
Gulp.task("svg", function(callback) {

  var destination,
      output,
      sources;

  destination = paths.relocate(config.common.paths.builds.svg[argv.mode]);
  output = destination + "/" + config.nodeModules.svgSprite.mode.symbol.sprite;
  sources = paths.relocate(config.common.paths.sources.svg);
  Del.sync(output, {force: true});
  Gulp
    .src(sources)
    .pipe(SvgSprite(config.nodeModules.svgSprite))
      .on("error", tasks.error.bind(null, "svg", callback))
    .pipe(Gulp.dest(destination))
      .on("error", tasks.error.bind(null, "svg", callback))
      .on("end", onTaskComplete.bind(null, callback));
});
