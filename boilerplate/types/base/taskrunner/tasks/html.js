import argv from "../modules/argv.js";
import config from "../config/config.js";
import gulp from "gulp";
import paths from "../modules/paths.js";
import tasks from "../modules/tasks.js";

import { process } from "../modules/preprocess-utils.js";

function onComplete(callback)
{
  global.browserSync.reload(); // TODO: avoid using a global variable
  callback();
}

function htmlTask(callback)
{
  const preprocessOptions = {
    srcDir: paths.relocate(config.common.paths.sources.html.directory),
    type: "html"
  };

  gulp.src(paths.relocate(config.common.paths.sources.html.default))
    .on("error", (err) => tasks.error("html", callback, err))
    .pipe(process(argv.env, preprocessOptions))
    .on("error", (err) => tasks.error("html", callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
    .on("error", (err) => tasks.error("html", callback, err))
    .on("end", () => tasks.success("html", onComplete.bind(null, callback)));
}

export default htmlTask;
