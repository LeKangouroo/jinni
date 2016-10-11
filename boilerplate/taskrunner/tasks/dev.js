import config from '../../config/config';
import gulp from 'gulp';
import logger from '../modules/logger';
import paths from '../modules/paths';
import runSequence from 'run-sequence';
import watch from 'gulp-watch';

runSequence.use(gulp);
gulp.task('dev', (callback) => {

  runSequence('clean', ['sass', 'svg', 'html', 'jade', 'javascript', 'api'], 'livereload', () => {

    watch(paths.relocate(config.common.paths.sources.html.watch), () => runSequence('html'));
    watch(paths.relocate(config.common.paths.sources.jade.watch), () => runSequence('jade'));
    watch(paths.relocate(config.common.paths.sources.js.watch), () => runSequence('javascript'));
    watch(paths.relocate(config.common.paths.sources.sass.watch), () => runSequence('sass'));
    watch(paths.relocate(config.common.paths.sources.svg), () => runSequence('svg'));
    callback();
    logger.success("👍  Everything looks good. You're ready to go!");
  });
});
