/*
 * Dependencies
 */
var _assign = require("lodash/assign");
var Exec = require("child_process").exec;


/*
 * Constants
 */
var CHANGELOG_DEFAULT_OPTIONS = {
  start: null,
  end: "HEAD"
};


/*
 * Module
 */
module.exports = {
  
  changelog: function(options) {
    
    return new Promise(function(resolve, reject) {
      
      var cmd,
          format,
          opts;
      
      if (!options.start)
      {
        reject(new Error("missing start commit ID (use npm run chlg -- --start=<commit-id>)"));
        return;
      }
      opts = _assign({}, CHANGELOG_DEFAULT_OPTIONS, options);
      switch (options.format)
      {
        case "html":
          format = "<li>%aN: %s (commit #%h)</li>";
          break;
        default:
          format = "%aN: %s (commit #%h)";
          break;
      }
      cmd = 'git log --pretty="format:' + format + '" --reverse ' + opts.start + '..' + opts.end;
      Exec(cmd, function(err, stdout) {
        
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
  }
};