/*
 * Modules
 */
var c = require("../modules/console");
var notifications = require("../modules/notifications");

module.exports = {
  
  error: function(taskName, callback, err) {
    
    var message,
        title;
        
    message = err.message;
    title = '"'+ taskName +'" task failed';
    c.error(title + ": " + message);
    notifications.notify({title: title, message: message, icon: taskName});
    // NOTE: uncomment the line below to debug the error
    // c.trace(err);
    return process.exit(1);
  },
  success: function(taskName, callback) {
    
    c.success('"'+ taskName +'" completed successfully!');
    callback();
  }
};