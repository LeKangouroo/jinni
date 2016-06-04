/*
 * Node Dependencies
 */
var BrowserSync = require("browser-sync").create();
var Gulp = require("gulp");

/*
 * Globals
 */
global.browserSync = BrowserSync;

/*
 * Modules
 */
var config = require("../modules/config");
var paths = require("../modules/paths");

/*
 * Task
 */
Gulp.task("livereload", function(callback) {

  var cfg;

  cfg = config.nodeModules.browserSync;
  cfg.server.baseDir = cfg.server.baseDir.map(function(path) {
    return paths.relocate(path);
  });
  BrowserSync.init(cfg, callback);
});
