import glob from "glob";
import path from "path";

export const getEntries = (globPath) => glob
  .sync(globPath)
  .map(file => ({name: path.basename(file, path.extname(file)), path: file}))
  .reduce((entries, entry) => Object.assign({}, entries, { [entry.name]: entry.path }), {});

export const getMode = argv => argv.mode === "distributable" ? "production" : "development";

export const getVendorPattern = () => /(node_modules)/;

export const isVendorModule = module => module.resource && getVendorPattern().test(module.resource);
