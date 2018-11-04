import { dest, src } from 'gulp';
import { preprocess } from 'preprocess';
import argv from '../modules/argv';
import config from '../config/config';
import paths from '../modules/paths';
import replace from 'gulp-replace-task';
import tasks from '../modules/tasks';
import through from 'through2';

function onComplete(callback)
{
  global.browserSync.reload();
  callback();
}

function htmlTask(callback)
{
  src(paths.relocate(config.common.paths.sources.html.default))
    .on('error', (err) => tasks.error('html', callback, err))
    .pipe(through.obj((file, enc, cb) => {

      const context = {
        ENV: argv.env
      };

      const options = {
        srcDir: paths.relocate(config.common.paths.sources.html.directory),
        type: "html"
      };

      file.contents = Buffer.from(preprocess(file.contents, context, options));
      cb(null, file);
    }))
    .on('error', (err) => tasks.error('html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns.common }))
    .on('error', (err) => tasks.error('html', callback, err))
    .pipe(replace({ patterns: config.common.replacements.patterns[argv.env] }))
    .on('error', (err) => tasks.error('html', callback, err))
    .pipe(dest(paths.relocate(config.common.paths.builds.html[argv.mode])))
    .on('error', (err) => tasks.error('html', callback, err))
    .on('end', () => tasks.success('html', onComplete.bind(null, callback)));
}

export const isPublic = false;
export const func = htmlTask;
