/*
 * Dependencies
 */
var Gulp = require("gulp");
var Gzip = require("gulp-gzip");
var Tar = require("gulp-tar");

/*
 * Modules
 */
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Task
 */
Gulp.task("zip", function(callback) {

  var buildData,
      filename;

  buildData = require(paths.relocate("dist/build.json"));
  filename = `${buildData.name}_${buildData.env}_${buildData.date}.tar`;
  Gulp
    .src(paths.relocate("dist/**"))
      .on("error", tasks.error.bind(null, "zip", callback))
    .pipe(Tar(filename))
      .on("error", tasks.error.bind(null, "zip", callback))
    .pipe(Gzip())
      .on("error", tasks.error.bind(null, "zip", callback))
    .pipe(Gulp.dest(paths.relocate("./")))
      .on("error", tasks.error.bind(null, "zip", callback))
      .on("end", tasks.success.bind(null, "zip", callback));
});
