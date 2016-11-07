import config from '../../config/config';
import gulp from 'gulp';
import jasmine from 'gulp-jasmine';
import paths from '../modules/paths';

gulp.task('instrumented-tests', () => {

  gulp
    .src(paths.relocate(config.common.paths.sources.instrumentedTests))
    .pipe(jasmine(config.nodeModules.jasmine));
});
