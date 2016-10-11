import config from '../../config/config';
import gulp from 'gulp';
import jsonServer from 'json-server';

gulp.task('api', (callback) => {

  const server = jsonServer.create();

  server.use(jsonServer.defaults());
  server.use(jsonServer.router(config.nodeModules.jsonServer.db));
  server.listen(config.tasks.api.port);
  callback();
});
