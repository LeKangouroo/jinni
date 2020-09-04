import browserSync from "browser-sync";
import config from "../config/config.js";
import paths from "../modules/paths.js";

const b = browserSync.create();

// TODO: avoid using a global variable
global.browserSync = b;

function livereloadTask(callback)
{
  const cfg = config.vendors.browserSync;

  cfg.server.baseDir = cfg.server.baseDir.map((path) => paths.relocate(path));
  b.init(cfg, callback);
}

export default livereloadTask;
