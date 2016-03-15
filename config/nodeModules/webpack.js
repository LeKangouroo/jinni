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
  ],
  distributable: [
    new Webpack.optimize.UglifyJsPlugin()
  ]
};

/*
 * Webpack configuration
 */
module.exports = {
  devtool: (argv.mode === "development") ? "inline-source-map" : null,
  entry: Path.resolve(PROJECT_DIR, "src/js/main.js"),
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|vendors)/, loader: "babel-loader"},
      { test: /\.html$/, exclude: /(node_modules|vendors)/, loader: "html-loader?attrs=false"}
    ]
  },
  resolve: {
    alias: {
      /*
       * Vendors
       */
      eventEmitter: Path.resolve(PROJECT_DIR, "src/vendors/eventEmitter/EventEmitter.min.js"),
      rlite: Path.resolve(PROJECT_DIR, "src/vendors/rlite/rlite.min.js"),
      svg4everybody: Path.resolve(PROJECT_DIR, "src/vendors/svg4everybody/dist/svg4everybody.min.js"),
      vue: Path.resolve(PROJECT_DIR, "src/vendors/vue/dist/vue.min.js"),

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
