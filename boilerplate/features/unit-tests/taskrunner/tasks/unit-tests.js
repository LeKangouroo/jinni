import { src } from 'gulp';
import config from '../config/config';
import mocha from 'gulp-mocha';
import paths from '../modules/paths';

function unitTestsTask(callback)
{
  src(paths.relocate(config.common.paths.sources.unitTests), { read: false })
    .pipe(mocha(config.nodeModules.mocha))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit());
}

export const isPublic = true;
export const func = unitTestsTask;
