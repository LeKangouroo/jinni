import gzip from "gulp-gzip";
import gulp from "gulp";
import paths from "../modules/paths.js";
import tar from "gulp-tar";
import tasks from "../modules/tasks.js";

import { readJSON } from "../modules/json.js";

function zipTask(callback)
{
  const buildData = readJSON(paths.relocate("dist/build.json"));
  const filename = `${buildData.name}_${buildData.env}_${buildData.date}.tar`;

  gulp.src(paths.relocate("dist/**"))
    .on("error", (err) => tasks.error("zip", callback, err))
    .pipe(tar(filename))
    .on("error", (err) => tasks.error("zip", callback, err))
    .pipe(gzip())
    .on("error", (err) => tasks.error("zip", callback, err))
    .pipe(gulp.dest(paths.relocate("./")))
    .on("error", (err) => tasks.error("zip", callback, err))
    .on("end", () => tasks.success("zip", callback));
}

export default zipTask;
