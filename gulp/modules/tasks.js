/*
 * Modules
 */
var c = require("../modules/console");

module.exports = {
  
  error: function(taskName, callback, err) {
    
    c.error('"'+ taskName +'" task failed: ' + err.message);
    // NOTE: uncomment the line below to debug the error
    // c.trace(err);
    return process.exit(1);
  },
  success: function(taskName, callback) {
    
    c.success('"'+ taskName +'" completed successfully!');
    callback();
  }
};