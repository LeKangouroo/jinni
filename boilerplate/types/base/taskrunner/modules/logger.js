import chalk from 'chalk';
import fancyLog from 'fancy-log';

export const log = (...args) => fancyLog.apply(null, args);

export const raw = (...args) => console.log.apply(null, args);

export const error = (msg) => log(chalk.red(`[ERROR] ${msg}`));

export const info = (msg) => log(chalk.blue(`[INFO] ${msg}`));

export const success = (msg) => log(chalk.green(`[SUCCESS] ${msg}`));

export const trace = (err) => console.trace(err);

export const warning = (msg) => log(chalk.yellow(`[WARNING] ${msg}`));

export default {
  log,
  error,
  info,
  raw,
  success,
  trace,
  warning
};
