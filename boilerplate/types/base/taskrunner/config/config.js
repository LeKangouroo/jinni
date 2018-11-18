import autoPrefixer from './vendors/auto-prefixer.json';
import browserSync from './vendors/browser-sync.json';
import clean from './tasks/clean.json';
import JPEGRecompress from './vendors/imagemin/jpeg-recompress.json';
import paths from './common/paths.json';
import PNGQuant from './vendors/imagemin/pngquant.json';
import replacements from './common/replacements';
import sass from './vendors/sass.json';
import svgSprite from './vendors/svg-sprite.json';
import webpack from './vendors/webpack';

export default {
  common: {
    paths,
    replacements
  },
  vendors: {
    autoPrefixer,
    browserSync,
    imagemin: { PNGQuant, JPEGRecompress },
    sass,
    svgSprite,
    webpack
  },
  tasks: {
    clean
  }
};
