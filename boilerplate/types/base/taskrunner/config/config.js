import autoPrefixer from "./vendors/auto-prefixer.js";
import browserSync from "./vendors/browser-sync.js";
import clean from "./tasks/clean.js";
import JPEGRecompress from "./vendors/imagemin/jpeg-recompress.js";
import paths from "./common/paths.js";
import PNGQuant from "./vendors/imagemin/pngquant.js";
import replacements from "./common/replacements.js";
import sass from "./vendors/sass.js";
import svgSprite from "./vendors/svg-sprite.js";
import webpack from "./vendors/webpack.js";

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
