/*
 * Dependencies
 */
var fs = require("fs");
var notifier = require("node-notifier");

/*
 * Modules
 */
var c = require("./console");
var paths = require("./paths");

module.exports = {
  
  notify: function(options) {

    var icon;

    icon = paths.relocate("gulp/assets/images/notifications/" + options.icon + ".png");
    try
    {
      fs.accessSync(icon, fs.F_OK);
    }
    catch (e)
    {
      icon = null;
    }
    notifier.notify(
      {
        icon: icon,
        title: options.title || "[NO TITLE]",
        message: options.message || "[NO MESSAGE]"
      },
      function(err) {
        
        if (err)
        {
          c.error("an error occured during notification: " + err.message);
          c.trace(err);
        }
      }
    );
  }
};