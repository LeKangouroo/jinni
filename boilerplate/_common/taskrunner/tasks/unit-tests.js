import config from '../../config/config';
import gulp from 'gulp';
import jasmine from 'gulp-jasmine';
import paths from '../modules/paths';

gulp.task('unit-tests', () => {

  gulp
    .src(paths.relocate(config.common.paths.sources.unitTests))
    .pipe(jasmine(config.nodeModules.jasmine));
});
