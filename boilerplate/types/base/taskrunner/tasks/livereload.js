import browserSync from 'browser-sync';
import config from '../config/config';
import paths from '../modules/paths';

const b = browserSync.create();

global.browserSync = b;

function livereloadTask(callback)
{
  const cfg = config.vendors.browserSync;

  cfg.server.baseDir = cfg.server.baseDir.map((path) => paths.relocate(path));
  b.init(cfg, callback);
}

export const isPublic = false;
export const func = livereloadTask;
