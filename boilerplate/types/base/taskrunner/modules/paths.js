import is from "ramda/src/is.js";
import path from "path";

const relocateGlob = (glob) => {

  if (!is(String, glob))
  {
    throw new TypeError(`invalid glob value: ${glob}`);
  }

  // NOTE: if path is excluded
  if (glob.charAt(0) === "!")
  {
    return "!" + path.resolve("../", glob.substring(1));
  }
  return path.resolve("../", glob);
};

export const relocate = (value) => {

  if (is(String, value))
  {
    return relocateGlob(value);
  }
  else if (value instanceof Array)
  {
    return value.map((glob) => relocateGlob(glob));
  }
  throw new TypeError("unexpected value type");
};

export default {
  relocate
};
