/*
 * Dependencies
 */
var VinylFTP = require("vinyl-ftp");
var Gulp = require("gulp");

/*
 * Modules
 */
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Task
 */
Gulp.task("ftp", function(callback) {

  var config,
      connection,
      source;

  config = require("../../config/tasks/ftp.json");
  connection = new VinylFTP({
    host: config.host,
    user: config.username,
    pass: config.password,
    log: console.log
  });
  source = paths.relocate(config.localRoot);
  Gulp
    .src(source + "/**", { base: source, buffer: false })
      .on("error", tasks.error.bind(null, "ftp", callback))
    .pipe(connection.newer(config.remoteRoot))
      .on("error", tasks.error.bind(null, "ftp", callback))
    .pipe(connection.dest(config.remoteRoot))
      .on("error", tasks.error.bind(null, "ftp", callback))
      .on("end", tasks.success.bind(null, "ftp", callback));
});
