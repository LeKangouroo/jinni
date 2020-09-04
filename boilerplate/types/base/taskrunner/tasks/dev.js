import cleanTask from "./clean.js";
import config from "../config/config.js";
import gulp from "gulp";
import htmlTask from "./html.js";
import javascriptTask from "./javascript.js";
import livereloadTask from "./livereload.js";
import logger from "../modules/logger.js";
import sassTask from "./sass.js";
import svgTask from "./svg.js";

import { relocate } from "../modules/paths.js";

function onDevTaskComplete(callback)
{
  gulp.watch(relocate(config.common.paths.sources.html.watch), htmlTask);
  gulp.watch(relocate(config.common.paths.sources.js.watch), javascriptTask);
  gulp.watch(relocate(config.common.paths.sources.sass.watch), sassTask);
  gulp.watch(relocate(config.common.paths.sources.svg), svgTask);
  callback();
  logger.success("👍  Everything looks good. You're ready to go!");
}

export default gulp.series(
  cleanTask,
  gulp.parallel(sassTask, svgTask, htmlTask, javascriptTask),
  livereloadTask,
  onDevTaskComplete);
