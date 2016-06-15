/*
 * Node Dependencies
 */
var AutoPrefixer = require("autoprefixer");
var Gulp = require("gulp");
var PostCSS = require("gulp-postcss");
var Sass = require("gulp-sass");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");
var tasks = require("../modules/tasks.js");

/*
 * Task
 */
Gulp.task("sass", function(callback) {

  Gulp
    .src(paths.relocate(config.common.paths.sources.sass.default))
      .on("error", tasks.error.bind(null, "sass", callback))
    .pipe(Sass(config.nodeModules.sass[argv.mode]))
      .on("error", tasks.error.bind(null, "sass", callback))
    .pipe(PostCSS([ AutoPrefixer(config.nodeModules.autoPrefixer) ]))
      .on("error", tasks.error.bind(null, "sass", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.css[argv.mode])))
      .on("end", tasks.success.bind(null, "sass", callback))
    .pipe(global.browserSync.stream());
});
