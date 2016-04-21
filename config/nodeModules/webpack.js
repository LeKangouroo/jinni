/*
 * Dependencies
 */
var Glob    = require("glob");
var Path    = require("path");
var Webpack = require("webpack");

/*
 * Modules
 */
var argv  = require("../../gulp/modules/argv");
var paths = require("../../config/common/paths.json");

/*
 * Constants
 */
const PROJECT_DIR = Path.resolve(__dirname, "../../");

const PLUGINS = {

  development: [
    new Webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendors.js" })
  ],
  distributable: [
    new Webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendors.js" }),
    new Webpack.optimize.UglifyJsPlugin()
  ]
};

/*
 * Functions
 */
function getEntries(globPath)
{
  var entries,
      entry,
      files,
      i;

  files = Glob.sync(globPath);
  entries = {};
  for (i = 0; i < files.length; i++)
  {
    entry = files[i];
    entries[Path.basename(entry, Path.extname(entry))] = entry;
  }
  return entries;
}

/*
 * Webpack configuration
 */
module.exports = function() {

  var entries;

  entries = getEntries(PROJECT_DIR + "/" + paths.sources.js.default);
  entries.vendors = ["rlite-router", "svg4everybody", "vue", "wolfy87-eventemitter"];

  return {
    devtool: (argv.mode === "development") ? "inline-source-map" : null,
    entry: entries,
    output: {
      filename: "[name].js"
    },
    module: {
      loaders: [
        {
          test:    /\.js$/,
          exclude: /(node_modules)/,
          loader:  "babel-loader"
        },
        {
          test:    /\.json$/,
          exclude: /(node_modules)/,
          loader:  "json-loader"
        },
        {
          test:    /\.html$/,
          exclude: /(node_modules)/,
          loader:  "html-loader?attrs=false"
        }
      ]
    },
    resolve: {
      alias: {

        /*
         * Directories
         */
        core:     PROJECT_DIR + "/src/js/core",
        modules:  PROJECT_DIR + "/src/js/modules",
        sections: PROJECT_DIR + "/src/sections"
      }
    },
    plugins: PLUGINS[argv.env]
  };
};
