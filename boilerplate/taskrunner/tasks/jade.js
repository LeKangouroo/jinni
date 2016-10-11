import argv from '../modules/argv';
import config from '../../config/config';
import gulp from 'gulp';
import jade from 'gulp-jade';
import paths from '../modules/paths';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';

const onComplete = (callback) => {

  global.browserSync.reload();
  callback();
};

gulp.task('jade', (callback) => {

  const cfg = config.nodeModules.jade;

  cfg.locals = { BUILD_MODE: argv.mode };
  gulp.src(paths.relocate(config.common.paths.sources.jade.default))
      .on('error', (err) => tasks.error('jade', callback, err))
    .pipe(jade(cfg))
      .on('error', (err) => tasks.error('jade', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
      .on('error', (err) => tasks.error('jade', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on('error', (err) => tasks.error('jade', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on('error', (err) => tasks.error('jade', callback, err))
      .on('end', () => tasks.success('jade', onComplete.bind(null, callback)));
});
