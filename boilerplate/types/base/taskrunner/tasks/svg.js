import { dest, src } from 'gulp';
import argv from '../modules/argv';
import config from '../config/config';
import del from 'del';
import paths from '../modules/paths';
import svgSprite from 'gulp-svg-sprite';
import tasks from '../modules/tasks';

const onComplete = (callback) => {

  tasks.success('svg', callback);
  global.browserSync.reload();
};

exports.isPublic = false;
exports.func = callback => {

  const destination = paths.relocate(config.common.paths.builds.svg[argv.mode]);
  const output = destination + '/' + config.nodeModules.svgSprite.mode.symbol.sprite;
  const sources = paths.relocate(config.common.paths.sources.svg);

  del.sync(output, {force: true});
  src(sources)
    .pipe(svgSprite(config.nodeModules.svgSprite))
      .on('error', (err) => tasks.error('svg', callback))
    .pipe(dest(destination))
      .on('error', (err) => tasks.error('svg', callback))
      .on('end', () => onComplete(callback));
};
