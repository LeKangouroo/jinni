/*
 * Node Dependencies
 */
var Gulp = require("gulp");
var JSHint = require("gulp-jshint");
var JSHintStylish = require("jshint-stylish");
var Replace = require("gulp-replace-task");
var RunSequence = require("run-sequence").use(Gulp);
var Webpack = require("webpack");
var WebpackStream = require("webpack-stream");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");
var replace = require("../modules/replace");
var tasks = require("../modules/tasks");

/*
 * Task
 */
Gulp.task("javascript", function(callback) {

  RunSequence("javascript-lint", "javascript-build", function() {

    global.browserSync.reload();
    tasks.success("javascript", callback);
  });
});
Gulp.task("javascript-build", function(callback) {

  return WebpackStream(config.nodeModules.webpack(), Webpack)
      .on("error", tasks.error.bind(null, "javascript", callback))
    .pipe(Replace({ patterns: replace.patterns.common }))
      .on("error", tasks.error.bind(null, "javascript", callback))
    .pipe(Replace({ patterns: replace.patterns[argv.env] }))
      .on("error", tasks.error.bind(null, "javascript", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.js[argv.mode])))
      .on("error", tasks.error.bind(null, "javascript", callback));
});
Gulp.task("javascript-lint", function(callback) {

  return Gulp
    .src(paths.relocate(config.common.paths.sources.js.default))
      .on("error", tasks.error.bind(null, "javascript", callback))
    .pipe(JSHint(config.nodeModules.jshint))
      .on("error", tasks.error.bind(null, "javascript", callback))
    .pipe(JSHint.reporter(JSHintStylish))
      .on("error", tasks.error.bind(null, "javascript", callback));
});
