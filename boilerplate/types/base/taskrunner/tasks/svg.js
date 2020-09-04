import argv from "../modules/argv.js";
import config from "../config/config.js";
import del from "del";
import gulp from "gulp";
import paths from "../modules/paths.js";
import svgSprite from "gulp-svg-sprite";
import tasks from "../modules/tasks.js";

function onComplete(callback)
{
  tasks.success("svg", callback);
  global.browserSync.reload();
}

function svgTask(callback)
{
  const destination = paths.relocate(config.common.paths.builds.svg[argv.mode]);
  const output = destination + "/" + config.vendors.svgSprite.mode.symbol.sprite;
  const sources = paths.relocate(config.common.paths.sources.svg);

  del.sync(output, {force: true});
  gulp.src(sources)
    .pipe(svgSprite(config.vendors.svgSprite))
    .on("error", (err) => tasks.error("svg", callback))
    .pipe(gulp.dest(destination))
    .on("error", (err) => tasks.error("svg", callback))
    .on("end", () => onComplete(callback));
}

export default svgTask;
