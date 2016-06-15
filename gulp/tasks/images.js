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
var tasks = require("../modules/tasks");

/*
 * Tasks
 */
Gulp.task("images", function(callback) {

  Gulp
    .src(paths.relocate(config.common.paths.sources.images))
      .on("error", tasks.error.bind(null, "images", callback))
    .pipe(Imagemin({
      use: [
        ImageminPNGQuant(config.nodeModules.imageminPNGQuant),
        ImageminJPEGRecompress(config.nodeModules.imageminJPEGRecompress)
      ]
    }))
      .on("error", tasks.error.bind(null, "images", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.images[argv.mode])))
      .on("error", tasks.error.bind(null, "images", callback))
      .on("end", tasks.success.bind(null, "images", callback));
});
