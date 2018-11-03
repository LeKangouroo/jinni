import browserSync from 'browser-sync';
import config from '../config/config';
import paths from '../modules/paths';

const b = browserSync.create();

global.browserSync = b;

exports.isPublic = false;
exports.func = callback => {

  const cfg = config.nodeModules.browserSync;

  cfg.server.baseDir = cfg.server.baseDir.map((path) => paths.relocate(path));
  b.init(cfg, callback);
};
