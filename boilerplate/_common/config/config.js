import api from './tasks/api.json';
import autoPrefixer from './nodeModules/auto-prefixer.json';
import browserSync from './nodeModules/browser-sync.json';
import clean from './tasks/clean.json';
import JPEGRecompress from './nodeModules/imagemin/jpeg-recompress.json';
import jshint from './nodeModules/jshint.json';
import jsonServerDB from './nodeModules/json-server/db.json';
import paths from './common/paths.json';
import PNGQuant from './nodeModules/imagemin/pngquant.json';
import pug from './nodeModules/pug.json';
import replacements from './common/replacements';
import sass from './nodeModules/sass.json';
import svgSprite from './nodeModules/svg-sprite.json';
import versioning from './common/versioning.json';
import webpack from './nodeModules/webpack';

export default {
  common: {
    paths,
    replacements,
    versioning
  },
  nodeModules: {
    autoPrefixer,
    browserSync,
    imagemin: { PNGQuant, JPEGRecompress },
    pug,
    jshint,
    jsonServer: { db: jsonServerDB },
    sass,
    svgSprite,
    webpack
  },
  tasks: {
    api,
    clean
  }
};
