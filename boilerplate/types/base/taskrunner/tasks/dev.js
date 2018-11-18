import { func as cleanTask } from './clean';
import { func as htmlTask } from './html';
import { func as javascriptTask } from './javascript';
import { func as livereloadTask } from './livereload';
import { func as sassTask } from './sass';
import { func as svgTask } from './svg';
import { parallel, series, watch } from 'gulp';
import { relocate } from '../modules/paths';
import config from '../config/config';
import logger from '../modules/logger';

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
