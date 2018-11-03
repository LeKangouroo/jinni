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
      rules: [
        {
          test: /\.jsx?$/,
          exclude: VENDOR_PATH_REGEXP,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: `${PROJECT_DIR}/tmp/_babel`
            }
          }
        },
        {
          test: /\.html$/,
          exclude: VENDOR_PATH_REGEXP,
          use: {
            loader: 'html-loader',
            options: {
              attrs: false
            }
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "vendors",
            test: module => module.resource && VENDOR_PATH_REGEXP.test(module.resource)
          }
        }
      }
    },
    resolve: {
      alias: {

        /*
         * Vendors
         */
        vue: "vue/dist/vue.esm.js",

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
