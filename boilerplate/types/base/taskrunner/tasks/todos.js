import argv from "../modules/argv.js";
import config from "../config/config.js";
import paths from "../modules/paths.js";
import tasks from "../modules/tasks.js";
import todo from "gulp-todo";

import { dest, src } from "gulp";

function todosTask(callback)
{
  src(paths.relocate(config.common.paths.sources.todos))
    .on("error", (err) => tasks.error("todos", callback, err))
    .pipe(todo({fileName: "TODO.md"}))
    .on("error", (err) => tasks.error("todos", callback, err))
    .pipe(dest(paths.relocate(config.common.paths.builds.todos[argv.mode])))
    .on("error", (err) => tasks.error("todos", callback, err))
    .on("end", () => tasks.success("todos", callback));
}

export const isPublic = false;
export const func = todosTask;
