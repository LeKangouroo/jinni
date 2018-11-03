import { src } from 'gulp';
import config from '../config/config';
import mocha from 'gulp-mocha';
import paths from '../modules/paths';

exports.isPublic = true;
exports.func = callback => {

  src(paths.relocate(config.common.paths.sources.unitTests), { read: false })
    .pipe(mocha(config.nodeModules.mocha))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit());
};
