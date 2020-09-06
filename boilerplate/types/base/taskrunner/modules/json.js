import { readFileSync } from "fs";

export const readJSON = path => JSON.parse(readFileSync(path));
