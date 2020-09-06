import argv from "../../modules/argv.js";

const common = {
  CACHE_BUST: Date.now(),
  ENV: argv.env,
  MODE: argv.mode
};

export const development = Object.freeze(Object.assign({}, common, {}));

export const preproduction = Object.freeze(Object.assign({}, common, {}));

export const production = Object.freeze(Object.assign({}, common, {}));
