import argv from '../modules/argv';
import config from '../../config/config';
import gulp from 'gulp';
import imagemin from 'imagemin';
import imageminJPEGRecompress from 'imagemin-jpeg-recompress';
import imageminPNGQuant from 'imagemin-pngquant';
import paths from '../modules/paths';
import tasks from '../modules/tasks';

gulp.task("images", (callback) => {

  const src = paths.relocate(config.common.paths.sources.images);
  const dest = paths.relocate(config.common.paths.builds.images[argv.mode]);

  imagemin([src], dest, {
    plugins: [
      imageminPNGQuant(config.nodeModules.imagemin.PNGQuant),
      imageminJPEGRecompress(config.nodeModules.imagemin.JPEGRecompress)
    ]
  })
  .then(
    () => tasks.success('images', callback),
    (err) => tasks.error('images', callback, err)
  );
});
