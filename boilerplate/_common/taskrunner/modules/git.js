import assign from 'lodash/assign';
import { exec } from 'child_process';

const CHANGELOG_DEFAULT_OPTIONS = {
  start: null,
  end: 'HEAD'
};

export const changelog = (options) => {

  return new Promise((resolve, reject) => {

    let cmd,
        format,
        opts;

    if (!options.start)
    {
      reject(new Error('missing start commit ID (use npm run chlg -- --start=<commit-id>)'));
      return;
    }
    opts = assign({}, CHANGELOG_DEFAULT_OPTIONS, options);
    switch (options.format)
    {
      case 'html':
        format = '<li>%aN: %s (commit #%h)</li>';
        break;
      default:
        format = '%aN: %s (commit #%h)';
        break;
    }
    cmd = `git log --first-parent --pretty="format:${format}" --reverse ${opts.start}..${opts.end}`;
    exec(cmd, (err, stdout) => {

      if (err)
      {
        reject(err);
      }
      else
      {
        resolve(stdout);
      }
    });
  });
};

export default {
  changelog
};