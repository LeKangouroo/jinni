import config from "../config/config.js";
import logger from "../modules/logger.js";

import { func as cleanTask } from "./clean.js";
import { func as htmlTask } from "./html.js";
import { func as javascriptTask } from "./javascript.js";
import { func as livereloadTask } from "./livereload.js";
import { func as sassTask } from "./sass.js";
import { func as svgTask } from "./svg.js";
import { parallel, series, watch } from "gulp";
import { relocate } from "../modules/paths.js";

function onDevTaskComplete(callback)
{
  watch(relocate(config.common.paths.sources.html.watch), htmlTask);
  watch(relocate(config.common.paths.sources.js.watch), javascriptTask);
  watch(relocate(config.common.paths.sources.sass.watch), sassTask);
  watch(relocate(config.common.paths.sources.svg), svgTask);
  callback();
  logger.success("👍  Everything looks good. You're ready to go!");
}

export const isPublic = true;
export const func = series(
  cleanTask,
  parallel(sassTask, svgTask, htmlTask, javascriptTask),
  livereloadTask,
  onDevTaskComplete);
