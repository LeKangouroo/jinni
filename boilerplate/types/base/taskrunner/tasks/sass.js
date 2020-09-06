import argv from "../modules/argv.js";
import autoPrefixer from "autoprefixer";
import config from "../config/config.js";
import gulp from "gulp";
import paths from "../modules/paths.js";
import postCSS from "gulp-postcss";
import sass from "gulp-sass";
import tasks from "../modules/tasks.js";

import { process } from "../modules/preprocess-utils.js";

function sassTask(callback)
{
  gulp.src(paths.relocate(config.common.paths.sources.sass.default))
    .pipe(process(argv.env, { type: "scss" }))
    .on("error", (err) => tasks.error("sass", callback, err))
    .pipe(sass(config.vendors.sass[argv.mode]))
    .on("error", (err) => tasks.error("sass", callback, err))
    .pipe(postCSS([ autoPrefixer(config.vendors.autoPrefixer) ]))
    .on("error", (err) => tasks.error("sass", callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.css[argv.mode])))
    .on("end", () => tasks.success("sass", callback))
    .pipe(global.browserSync.stream()); // TODO: eviter la variable globale
}

export default sassTask;
