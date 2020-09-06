import argv from "../modules/argv.js";
import config from "../config/config.js";
import gulp from "gulp";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import paths from "../modules/paths.js";
import tasks from "../modules/tasks.js";

function imagesTask(callback)
{
  const sources = paths.relocate(config.common.paths.sources.images);
  const destination = paths.relocate(config.common.paths.builds.images[argv.mode]);
  const plugins = [
    imageminPngquant(config.vendors.imagemin.pngquant),
    imagemin.mozjpeg(config.vendors.imagemin.mozjpeg)
  ];

  gulp.src(sources)
    .pipe(imagemin(plugins, { verbose: true }))
    .on("error", (err) => tasks.error("images", callback, err))
    .pipe(gulp.dest(destination))
    .on("end", () => tasks.success("images", callback));
}

export default imagesTask;
