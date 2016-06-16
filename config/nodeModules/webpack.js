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

  var config;

  config = {
    entry: getEntries(PROJECT_DIR + "/" + paths.sources.js.default),
    output: {
      filename: "[name].js"
    },
    module: {
      loaders: [
        {
          test:    /\.js$/,
          exclude: /(node_modules)/,
          loader:  "babel-loader",
          query:   { cacheDirectory: PROJECT_DIR + "/tmp/_babel" }
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
    }
  };
  if (argv.mode === "distributable")
  {
    config.devtool = "#source-map";
    config.entry.vendors = ["rlite-router", "svg4everybody", "vue", "wolfy87-eventemitter"];
    config.module.loaders.push({
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "strip-loader?strip[]=console.log"
    });
    config.plugins = [
      new Webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendors.js" }),
      new Webpack.optimize.UglifyJsPlugin()
    ];
  }
  else
  {
    config.devtool = "#eval-cheap-module-source-map";
    config.plugins = [
      new Webpack.optimize.CommonsChunkPlugin({ name: "vendors", filename: "vendors.js" })
    ];
  }
  return config;
};
