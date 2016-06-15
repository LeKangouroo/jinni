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
var c = require("../modules/console");
var config = require("../modules/config");
var paths = require("../modules/paths");

/*
 * Internal functions
 */
function onSvgSpriteError(callback, err)
{
  c.error('"svg" task failed: ' + err.message);
  c.warning("Maybe an SVG file is not correctly formatted. Try to debug them using a web browser (i.e. Google Chrome)");
  callback(err);
}
function onTaskComplete(callback)
{
  c.success('"svg" task completed successfully!');
  global.browserSync.reload();
  callback();
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
      .on("error", onSvgSpriteError.bind(null, callback))
    .pipe(Gulp.dest(destination))
      .on("end", onTaskComplete.bind(null, callback));
});
