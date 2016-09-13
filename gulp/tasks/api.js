/*
 * Node Dependencies
 */
var Gulp = require("gulp");
var JSONServer = require("json-server");

/*
 * Modules
 */
var config = require("../../config/config");

/*
 * Tasks
 */
Gulp.task("api", function(callback) {

  var server;

  server = JSONServer.create();
  server.use(JSONServer.defaults());
  server.use(JSONServer.router(config.nodeModules.jsonServer.db));
  server.listen(config.tasks.api.port);
  callback();
});
