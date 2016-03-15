/*
 * Dependencies
 */
var Path = require("path");
var Webpack = require("webpack");

/*
 * Modules
 */
var argv = require("../../gulp/modules/argv");

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
 * Webpack configuration
 */
module.exports = {
  devtool: (argv.mode === "development") ? "inline-source-map" : null,
  entry: {
    main: Path.resolve(PROJECT_DIR, "src/js/main.js"),
    vendors: ["rlite-router", "svg4everybody", "vue", "webcomponents.js", "wolfy87-eventemitter"]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: "babel-loader"},
      { test: /\.json$/, exclude: /(node_modules)/, loader: "json-loader"},
      { test: /\.html$/, exclude: /(node_modules)/, loader: "html-loader?attrs=false"}
    ]
  },
  resolve: {
    alias: {

      /*
       * Directories
       */
      core: Path.resolve(PROJECT_DIR, "src/js/core"),
      modules: Path.resolve(PROJECT_DIR, "src/js/modules"),
      sections: Path.resolve(PROJECT_DIR, "src/sections")
    }
  },
  plugins: PLUGINS[argv.mode]
};
