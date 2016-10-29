var fs      = require('fs');
var tasks   = fs.readdirSync('./tasks/');

// Tasks loading
tasks.forEach(function(task) {
    require('./tasks/' + task);
});
