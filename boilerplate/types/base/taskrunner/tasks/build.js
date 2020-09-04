import argv from "../modules/argv.js";
import fs from "fs";
import git from "../modules/git.js";
import gulp from "gulp";
import htmlTask from "./html.js";
import imagesTask from "./images.js";
import javascriptTask from "./javascript.js";
import logger from "../modules/logger.js";
import path from "path";
import paths from "../modules/paths.js";
import sassTask from "./sass.js";
import staticFilesTask from "./staticFiles.js";
import svgTask from "./svg.js";
import todosTask from "./todos.js";

import { readJSON } from "../modules/json.js";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const pkgPath = path.join(currentFilePath, "..", "..", "..", "package.json");
const pkg = readJSON(pkgPath);

function saveBuildData(filePath, data)
{
  return new Promise((resolve, reject) => {

    const DIST_DIRECTORY = paths.relocate("dist");

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {

      if (err)
      {
        logger.error(`❗  Couldn't write the following file: ${filePath}`);
        reject(err);
      }
      logger.success(`👍  Completed successfully! Your build is available in the following directory: ${DIST_DIRECTORY}`);
      resolve();
    });
  });
}

function onBuildTaskComplete(options, callback)
{
  const { pkg, argv } = options;
  const BUILD_DATA_FILE = paths.relocate("dist/build.json");
  const BUILD_DATA = {
    date: new Date().toISOString(),
    env: argv.env,
    lastCommit: false,
    mode: argv.mode,
    name: pkg.name,
    version: pkg.version ?? null
  };

  git
    .getHeadCommit()
    .then((headCommit) => {

      BUILD_DATA.lastCommit = headCommit;
      saveBuildData(BUILD_DATA_FILE, BUILD_DATA)
        .then(() => callback())
        .catch(() => callback());
    })
    .catch((err) => {

      logger.warning("Git HEAD commit retrieving failed. See details below:");
      logger.trace(err.message);
      saveBuildData(BUILD_DATA_FILE, BUILD_DATA)
        .then(() => callback())
        .catch(() => callback());
    });
}

export default gulp.series(
    gulp.parallel(sassTask, svgTask, htmlTask, javascriptTask, staticFilesTask, imagesTask, todosTask),
    (cb) => onBuildTaskComplete({ argv, pkg }, cb));
