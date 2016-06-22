/*
 * Dependencies
 */
var Gulp = require("gulp");
var Todo = require("gulp-todo");

/*
 * Modules
 */
var argv = require("../modules/argv");
var config = require("../modules/config");
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Task
 */
Gulp.task("todos", function(callback) {

  Gulp
    .src(paths.relocate(config.common.paths.sources.todos))
      .on("error", tasks.error.bind(null, "todos", callback))
    .pipe(Todo({fileName: "TODO.md"}))
      .on("error", tasks.error.bind(null, "todos", callback))
    .pipe(Gulp.dest(paths.relocate(config.common.paths.builds.todos[argv.mode])))
      .on("error", tasks.error.bind(null, "todos", callback))
      .on("end", tasks.success.bind(null, "todos", callback));
});