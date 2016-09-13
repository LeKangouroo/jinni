module.exports = {
  common: {
    paths: require("./common/paths.json"),
    replacements: require('./common/replacements')
  },
  nodeModules: {
    autoPrefixer: require("./nodeModules/auto-prefixer.json"),
    browserSync: require("./nodeModules/browser-sync.json"),
    imageminPNGQuant: require("./nodeModules/imagemin-pngquant.json"),
    imageminJPEGRecompress: require("./nodeModules/imagemin-jpeg-recompress.json"),
    jade: require("./nodeModules/jade.json"),
    jshint: require("./nodeModules/jshint.json"),
    jsonServer: {
      db: require("./nodeModules/json-server/db.json")
    },
    sass: require("./nodeModules/sass.json"),
    svgSprite: require("./nodeModules/svg-sprite.json"),
    webpack: require("./nodeModules/webpack.js")
  },
  tasks: {
    api: require("./tasks/api.json"),
    clean: require("./tasks/clean.json")
  }
};
