module.exports = {
  common: {
    paths: require("../../config/common/paths.json"),
    replacements: require('../../config/common/replacements')
  },
  nodeModules: {
    autoPrefixer: require("../../config/nodeModules/auto-prefixer.json"),
    browserSync: require("../../config/nodeModules/browser-sync.json"),
    imageminPNGQuant: require("../../config/nodeModules/imagemin-pngquant.json"),
    imageminJPEGRecompress: require("../../config/nodeModules/imagemin-jpeg-recompress.json"),
    jade: require("../../config/nodeModules/jade.json"),
    jshint: require("../../config/nodeModules/jshint.json"),
    jsonServer: {
      db: require("../../config/nodeModules/json-server/db.json")
    },
    sass: require("../../config/nodeModules/sass.json"),
    svgSprite: require("../../config/nodeModules/svg-sprite.json"),
    webpack: require("../../config/nodeModules/webpack.js")
  },
  tasks: {
    api: require("../../config/tasks/api.json"),
    clean: require("../../config/tasks/clean.json")
  }
};
