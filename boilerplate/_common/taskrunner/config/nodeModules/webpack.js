/*
 * Imports
 */

import argv  from '../../modules/argv';
import glob from 'glob';
import mergeWith from 'lodash/mergeWith';
import path from 'path';
import paths from '../common/paths.json';
import pathsModule from '../../modules/paths';
import webpack from 'webpack';


/*
 * Functions
 */

const merge = (object, ...sources) => mergeWith(object, ...sources, (objValue, srcValue) => {

  if (Array.isArray(objValue))
  {
    return objValue.concat(srcValue);
  }
  return undefined;
});

const getEntries = (globPath) => glob.sync(globPath).reduce((entries, entry) => Object.assign({}, entries, {
  [`${path.basename(entry, path.extname(entry))}`]: entry
}), {});

const getConfiguration = () => {

  const PROJECT_DIR = pathsModule.relocate('./');
  const VENDOR_PATH_REGEXP = /(node_modules)/;
  const COMMON_CONFIG = {
    devtool: 'source-map',
    entry: getEntries(`${PROJECT_DIR}/${paths.sources.js.default}`),
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test:    /\.jsx?$/,
          exclude: VENDOR_PATH_REGEXP,
          loader:  'babel-loader',
          query:   { cacheDirectory: `${PROJECT_DIR}/tmp/_babel` }
        },
        {
          test:    /\.json$/,
          exclude: VENDOR_PATH_REGEXP,
          loader:  'json-loader'
        },
        {
          test:    /\.html$/,
          exclude: VENDOR_PATH_REGEXP,
          loader:  'html-loader?attrs=false'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: (module) => module.resource && VENDOR_PATH_REGEXP.test(module.resource),
        filename: 'common.js'
      })
    ],
    resolve: {
      alias: {

        /*
         * Directories
         */
        classes: PROJECT_DIR + '/src/js/classes',
        components: PROJECT_DIR + '/src/components',
        core: PROJECT_DIR + '/src/js/core',
        modules: PROJECT_DIR + '/src/js/modules',
        sections: PROJECT_DIR + '/src/sections'
      }
    }
  };

  if (argv.mode === 'distributable')
  {
    return Object.freeze(merge({}, COMMON_CONFIG, {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: VENDOR_PATH_REGEXP,
            loader: 'strip-loader?strip[]=console.log'
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production") // NOTE: if the string is not wrapped with quotes, it'll be considered as a variable
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
      ]
    }));
  }
  return Object.freeze(COMMON_CONFIG);
};

export default getConfiguration;
