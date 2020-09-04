import pp from "preprocess";
import through from "through2";

import { getEnvironmentVariables } from "./environments.js";

export function process(env, options = { type: "js" })
{
  return through.obj((file, enc, cb) => {

    file.contents = Buffer.from(pp.preprocess(file.contents, getEnvironmentVariables(env), options));
    cb(null, file);
  })
}
