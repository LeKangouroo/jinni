import { dest, src } from 'gulp';
import config from '../config/config';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

function staticTask(callback)
{
  const options = {
    base: paths.relocate(config.common.paths.static.base)
  };
  const source = paths.relocate(config.common.paths.static.source);

  src(source, options)
    .on('error', (err) => tasks.error('static', callback, err))
    .pipe(dest(paths.relocate(config.common.paths.static.destination)))
    .on('error', (err) => tasks.error('static', callback, err))
    .on('end', () => tasks.success('static', callback));
}

export const isPublic = false;
export const func = staticTask;
