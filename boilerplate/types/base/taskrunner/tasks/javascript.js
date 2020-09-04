import argv from "../modules/argv.js";
import config from "../config/config.js";
import eslint from "gulp-eslint";
import gulp from "gulp";
import gulpIf from "gulp-if";
import paths from "../modules/paths.js";
import replace from "gulp-replace-task"; // TODO: remplacer ça le package preprocess
import tasks from "../modules/tasks.js";
import webpack from "webpack";
import webpackStream from "webpack-stream";

function javascriptBuildTask(callback)
{
  return webpackStream(config.vendors.webpack(), webpack)
    .on("error", (err) => tasks.error("javascript", callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
    .on("error", (err) => tasks.error("javascript", callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
    .on("error", (err) => tasks.error("javascript", callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.js[argv.mode])))
    .on("error", (err) => tasks.error("javascript", callback, err));
}

function javascriptLintTask(callback)
{
  const isDistributableBuild = argv.mode === "distributable";

  return gulp.src(paths.relocate(config.common.paths.sources.js.default))
    .on("error", (err) => tasks.error("javascript", callback, err))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(isDistributableBuild, eslint.failAfterError()))
    .on("error", (err) => tasks.error("javascript", callback, err));
}

function javascriptTaskComplete(callback)
{
  global.browserSync.reload();
  tasks.success("javascript", callback);
}

export default gulp.series(javascriptLintTask, javascriptBuildTask, javascriptTaskComplete);
