/*
 * Dependencies
 */
import argv  from '../../taskrunner/modules/argv';
import glob from 'glob';
import path from 'path';
import paths from '../common/paths.json';
import webpack from 'webpack';

/*
 * Constants
 */
const PROJECT_DIR = path.resolve(__dirname, '../../');
const WEBPACK_COMMONS_CHUNK_PLUGIN_CONFIG = {
  name: 'common',
  minChunks: (module) => isVendor(module),
  filename: 'common.js'
};

/*
 * Functions
 */
const isVendor = (module) => {

  return module.resource && module.resource.indexOf('node_modules') > -1;
};

const getEntries = (globPath) => {

  const files = glob.sync(globPath);
  const entries = {};

  for (let i = 0; i < files.length; i++)
  {
    let entry = files[i];
    entries[path.basename(entry, path.extname(entry))] = entry;
  }
  return entries;
};

const getConfiguration = () => {

  const config = {
    devtool: 'source-map',
    entry: getEntries(PROJECT_DIR + '/' + paths.sources.js.default),
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test:    /\.js$/,
          exclude: /(node_modules)/,
          loader:  'babel-loader',
          query:   { cacheDirectory: PROJECT_DIR + '/tmp/_babel' }
        },
        {
          test:    /\.json$/,
          exclude: /(node_modules)/,
          loader:  'json-loader'
        },
        {
          test:    /\.html$/,
          exclude: /(node_modules)/,
          loader:  'html-loader?attrs=false'
        },
        {
          test:    /\.vue$/,
          exclude: /(node_modules)/,
          loader:  'vue-loader'
        }
      ]
    },
    resolve: {
      alias: {

        /*
         * Directories
         */
        core: PROJECT_DIR + '/src/js/core',
        modules: PROJECT_DIR + '/src/js/modules',
        vuejs: PROJECT_DIR + '/src/vuejs',

        // TODO: remove this line when VueJS code architecture has been updated
        vue: 'vue/dist/vue.js'
      }
    }
  };
  if (argv.mode === 'distributable')
  {
    config.module.loaders.push({
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'strip-loader?strip[]=console.log'
    });
    config.plugins = [
      new webpack.optimize.CommonsChunkPlugin(WEBPACK_COMMONS_CHUNK_PLUGIN_CONFIG),
      new webpack.optimize.UglifyJsPlugin()
    ];
  }
  else
  {
    config.plugins = [
      new webpack.optimize.CommonsChunkPlugin(WEBPACK_COMMONS_CHUNK_PLUGIN_CONFIG)
    ];
  }
  return config;
};

export default getConfiguration;
