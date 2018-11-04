import { func as htmlTask } from './html';
import { func as imagesTask } from './images';
import { func as javascriptTask } from './javascript';
import { func as sassTask } from './sass';
import { func as staticTask } from './static';
import { func as svgTask } from './svg';
import { func as todosTask } from './todos';
import { parallel, series } from 'gulp';
import argv from '../modules/argv';
import fs from 'fs';
import git from '../modules/git';
import logger from '../modules/logger';
import paths from '../modules/paths';
import pkg from '../../package.json';

function saveBuildData(filePath, data)
{
  return new Promise((resolve, reject) => {

    const DIST_DIRECTORY = paths.relocate('dist');

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

function onBuildTaskComplete(callback)
{
  const BUILD_DATA_FILE = paths.relocate('dist/build.json');
  const BUILD_DATA = {
    date: new Date().toISOString(),
    env: argv.env,
    lastCommit: false,
    mode: argv.mode,
    name: pkg.name,
    version: pkg.version || null
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

      logger.warning('Git HEAD commit retrieving failed. See details below:');
      logger.trace(err.message);
      saveBuildData(BUILD_DATA_FILE, BUILD_DATA)
        .then(() => callback())
        .catch(() => callback());
    });
}

export const isPublic = true;
export const func = series(
    parallel(sassTask, svgTask, htmlTask, javascriptTask, staticTask, imagesTask, todosTask),
    onBuildTaskComplete);
