import { src } from 'gulp';
import argv from '../modules/argv';
import config from '../config/config';
import imagemin from 'gulp-imagemin';
import imageminJPEGRecompress from 'imagemin-jpeg-recompress';
import imageminPNGQuant from 'imagemin-pngquant';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

function imagesTask(callback)
{
  const sources = paths.relocate(config.common.paths.sources.images);
  const dest = paths.relocate(config.common.paths.builds.images[argv.mode]);
  const plugins = [
    imageminPNGQuant(config.nodeModules.imagemin.PNGQuant),
    imageminJPEGRecompress(config.nodeModules.imagemin.JPEGRecompress)
  ];

  src(sources)
    .pipe(imagemin(plugins, { verbose: true }))
    .on('error', (err) => tasks.error('images', callback, err))
    .pipe(gulp.dest(dest))
    .on('end', () => tasks.success('images', callback));
}

export const isPublic = false;
export const func = imagesTask;
