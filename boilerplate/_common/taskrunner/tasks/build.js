import argv from '../modules/argv';
import gulp from 'gulp';
import jsonFile from 'jsonfile';
import logger from '../modules/logger';
import paths from '../modules/paths';
import pkg from '../../package.json';

gulp.task('build', ['sass', 'svg', 'html', 'pug', 'javascript', 'static', 'images', 'todos'], (callback) => {

  const buildData = {
    date: new Date().toISOString(),
    env: argv.env,
    name: pkg.name
  };
  const buildDataFile = paths.relocate('dist/build.json');
  jsonFile.writeFile(buildDataFile, buildData, (err) => {

    if (err)
    {
      logger.error(`❗  Couldn't write the following file: ${buildDataFile}`);
      logger.trace(err);
    }
    else
    {
      logger.success(`👍  Completed successfully! Your build is available in the following directory: ${paths.relocate('dist')}`);
    }
    callback();
  });
});
