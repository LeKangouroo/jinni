const chalk = require("chalk");
const fancyLog = require("fancy-log");

const log = (...args) => fancyLog.apply(null, args);
const raw = (...args) => console.log.apply(null, args);
const error = (msg) => log(chalk.red(`[ERROR] ${msg}`));
const info = (msg) => log(chalk.blue(`[INFO] ${msg}`));
const success = (msg) => log(chalk.green(`[SUCCESS] ${msg}`));
const trace = (err) => console.trace(err);
const warning = (msg) => log(chalk.yellow(`[WARNING] ${msg}`));

module.exports = {
  log,
  error,
  info,
  raw,
  success,
  trace,
  warning
};
