import browserSync from "./vendors/browser-sync.js";
import clean from "./tasks/clean.js";
import mozjpeg from "./vendors/imagemin/mozjpeg.js";
import pngquant from "./vendors/imagemin/pngquant.js";
import paths from "./common/paths.js";
import sass from "./vendors/sass.js";
import svgSprite from "./vendors/svg-sprite.js";
import webpack from "./vendors/webpack.js";

export default {
  common: {
    paths
  },
  vendors: {
    browserSync,
    imagemin: { mozjpeg, pngquant },
    sass,
    svgSprite,
    webpack
  },
  tasks: {
    clean
  }
};
