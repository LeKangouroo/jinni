import argv from '../modules/argv';
import git from '../modules/git';
import gulp from 'gulp';
import jsonFile from 'jsonfile';
import logger from '../modules/logger';
import paths from '../modules/paths';
import pkg from '../../package.json';

gulp.task('build', ['sass', 'svg', 'html', 'pug', 'javascript', 'static', 'images', 'todos'], (callback) => {

  const buildData = {
    date: new Date().toISOString(),
    env: argv.env,
    name: pkg.name,
    version: pkg.version || null
  };
  const buildDataFile = paths.relocate('dist/build.json');

  git
    .getHeadCommit()
    .then((headCommit) => {

      buildData.lastCommit = headCommit;
      jsonFile.writeFile(buildDataFile, buildData, (err) => {

        if (err)
        {
          logger.error(`❗  Couldn't write the following file: ${buildDataFile}`);
          logger.trace(err);
          return callback();
        }
        logger.success(`👍  Completed successfully! Your build is available in the following directory: ${paths.relocate('dist')}`);
        callback();
      });
    })
    .catch((err) => {
      logger.error('git HEAD commit retrieving failed');
      logger.trace(err);
      callback();
    });
});
