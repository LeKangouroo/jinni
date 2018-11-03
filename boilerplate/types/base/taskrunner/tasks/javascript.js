import argv from '../modules/argv';
import config from '../config/config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import paths from '../modules/paths';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const buildTask = callback => {

  return webpackStream(config.nodeModules.webpack(), webpack)
      .on('error', (err) => tasks.error('javascript', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
      .on('error', (err) => tasks.error('javascript', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on('error', (err) => tasks.error('javascript', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.js[argv.mode])))
      .on('error', (err) => tasks.error('javascript', callback, err));
};

const lintTask = callback => {

  const isDistributableBuild = argv.mode === 'distributable';

  return gulp
    .src(paths.relocate(config.common.paths.sources.js.default))
      .on('error', (err) => tasks.error('javascript', callback, err))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpIf(isDistributableBuild, eslint.failAfterError()))
      .on('error', (err) => tasks.error('javascript', callback, err));
};

const onComplete = callback => {

  global.browserSync.reload();
  tasks.success('javascript', callback);
};

exports.isPublic = false;
exports.func = gulp.series(lintTask, buildTask, onComplete);
