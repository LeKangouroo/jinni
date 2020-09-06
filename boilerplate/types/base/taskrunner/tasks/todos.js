import argv from "../modules/argv.js";
import config from "../config/config.js";
import gulp from "gulp";
import paths from "../modules/paths.js";
import tasks from "../modules/tasks.js";
import todo from "gulp-todo";

function todosTask(callback)
{
  gulp.src(paths.relocate(config.common.paths.sources.todos))
    .on("error", (err) => tasks.error("todos", callback, err))
    .pipe(todo({fileName: "TODO.md"}))
    .on("error", (err) => tasks.error("todos", callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.todos[argv.mode])))
    .on("error", (err) => tasks.error("todos", callback, err))
    .on("end", () => tasks.success("todos", callback));
}

export default todosTask;
