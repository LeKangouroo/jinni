import browserSync from "browser-sync";
import config from "../config/config.js";
import paths from "../modules/paths.js";

const b = browserSync.create();

export function getStream()
{
  return b.stream();
}

export function reload()
{
  b.reload();
}

export default function livereloadTask(callback)
{
  const cfg = config.vendors.browserSync.getConfig();

  cfg.server.baseDir = cfg.server.baseDir.map((path) => paths.relocate(path));
  b.init(cfg, callback);
};
