import config from '../config/config';
import jsonServer from 'json-server';
import logger from '../modules/logger';

exports.isPublic = true;
exports.func = callback => {

  const jsonServerConfig = config.nodeModules.jsonServer;
  const server = jsonServer.create();

  server.use(jsonServer.defaults());
  server.use(jsonServer.bodyParser);
  server.use(jsonServer.router(jsonServerConfig.database));
  server.listen(jsonServerConfig.port, () => {

    logger.success(`API REST available at http://localhost:${jsonServerConfig.port}`);
    callback();
  });
};
