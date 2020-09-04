import argv from "../../modules/argv.js";
import paths from "../common/paths.js";
import pathsModule from "../../modules/paths.js";
import webpack from "webpack";

import {
  getEntries,
  getMode,
  getVendorPattern,
  isVendorModule,
  merge
} from "../../modules/webpack-utils.js";

export default () => {

  const MODE = getMode(argv);
  const PROJECT_DIR = pathsModule.relocate("./");
  const COMMON_CONFIG = {
    devtool: "source-map",
    mode: MODE,
    entry: getEntries(`${PROJECT_DIR}/${paths.sources.js.default}`),
    output: {
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: getVendorPattern(),
          use: {
            loader: "html-loader",
            options: {
              attributes: false
            }
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        minChunks: 1,
        cacheGroups: {
          vendors: {
            name: "vendors",
            test: isVendorModule
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
        classes: PROJECT_DIR + "/src/js/classes",
        components: PROJECT_DIR + "/src/components",
        core: PROJECT_DIR + "/src/js/core",
        modules: PROJECT_DIR + "/src/js/modules",
        sections: PROJECT_DIR + "/src/sections"
      }
    }
  };

  if (MODE === "production")
  {
    return Object.freeze(merge({}, COMMON_CONFIG, {
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production") // NOTE: if the string is not wrapped with quotes, it"ll be considered as a variable
          }
        })
      ]
    }));
  }
  return Object.freeze(COMMON_CONFIG);
};
