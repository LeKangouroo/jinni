import argv from '../modules/argv';
import config from '../config/config';
import gulp from 'gulp';
import gutil from 'gulp-util';
import paths from '../modules/paths';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';
import through2 from 'through2';

const convertReactToHtml = () => {

  return through2.obj(function(chunk, encoding, callback) {

    const component = require(chunk.path).default;

    chunk.contents = new Buffer(ReactDOMServer.renderToStaticMarkup(component));
    callback(null, chunk);
  });
};

const onComplete = (callback) => {

  global.browserSync.reload();
  callback();
};

const replaceExtension = (newExtension) => {

  return through2.obj(function(chunk, encoding, callback) {

    chunk.path = gutil.replaceExtension(chunk.path, newExtension);
    callback(null, chunk);
  });
};

gulp.task('react-to-html', (callback) => {

  gulp.src(paths.relocate(config.common.paths.sources.reactHtml.default))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(convertReactToHtml())
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(replaceExtension('.html'))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(replaceExtension('.html'))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
    .pipe(gulp.dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
      .on('error', (err) => tasks.error('react-to-html', callback, err))
      .on('end', () => tasks.success('react-to-html', onComplete.bind(null, callback)));
});
