import autoPrefixer from './nodeModules/auto-prefixer.json';
import browserSync from './nodeModules/browser-sync.json';
import clean from './tasks/clean.json';
import fs from 'fs';
import JPEGRecompress from './nodeModules/imagemin/jpeg-recompress.json';
import mocha from './nodeModules/mocha';
import paths from './common/paths.json';
import PNGQuant from './nodeModules/imagemin/pngquant.json';
import replacements from './common/replacements';
import sass from './nodeModules/sass.json';
import svgSprite from './nodeModules/svg-sprite.json';
import webpack from './nodeModules/webpack';

/*
 * Optional configurations
 */
const JSON_SERVER_CONFIG_PATH = `${__dirname}/nodeModules/json-server.json`;
const MOCHA_CONFIG_PATH = `${__dirname}/nodeModules/mocha.js`;

/*
 * Base configuration
 */
const config = {
  common: {
    paths,
    replacements
  },
  nodeModules: {
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

/*
 * REST API feature configuration
 */
if (fs.existsSync(JSON_SERVER_CONFIG_PATH))
{
  config.nodeModules.jsonServer = require(JSON_SERVER_CONFIG_PATH);
}

/*
 * Unit tests feature configuration
 */
if (fs.existsSync(MOCHA_CONFIG_PATH))
{
  config.nodeModules.mocha = require(MOCHA_CONFIG_PATH);
}

export default config;
