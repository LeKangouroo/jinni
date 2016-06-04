/*
 * Node Dependencies
 */
var Gulp = require("gulp");
var Imagemin = require("gulp-imagemin");
var ImageminPNGQuant = require("imagemin-pngquant");
var ImageminJPEGRecompress = require("imagemin-jpeg-recompress");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");

/*
 * Tasks
 */
Gulp.task("images", function() {

  return Gulp
    .src(paths.relocate(config.common.paths.sources.images))
    .pipe(Imagemin({
      use: [
        ImageminPNGQuant(config.nodeModules.imageminPNGQuant),
        ImageminJPEGRecompress(config.nodeModules.imageminJPEGRecompress)
      ]
    }))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.images[argv.mode])));
});
