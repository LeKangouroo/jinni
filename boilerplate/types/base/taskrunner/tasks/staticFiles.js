import config from "../config/config.js";
import gulp from "gulp";
import paths from "../modules/paths.js";
import tasks from "../modules/tasks.js";

function staticFilesTask(callback)
{
  const options = {
    base: paths.relocate(config.common.paths.staticFiles.base)
  };
  const source = paths.relocate(config.common.paths.staticFiles.source);

  gulp.src(source, options)
    .on("error", (err) => tasks.error("staticFiles", callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.staticFiles.destination)))
    .on("error", (err) => tasks.error("staticFiles", callback, err))
    .on("end", () => tasks.success("staticFiles", callback));
}

export default staticFilesTask;
