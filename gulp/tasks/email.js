/*
 * Node Dependencies
 */
var _template = require("lodash/template");
var Fs = require("fs");
var Gulp = require("gulp");
var Nodemailer = require("nodemailer");

/*
 * Modules
 */
var paths = require("../modules/paths");
var tasks = require("../modules/tasks");

/*
 * Tasks
 */
Gulp.task("email", function(callback) {

  var config,
      mailOptions,
      template,
      transportData,
      transporter;

  config = require(paths.relocate("config/tasks/email.json"));
  transportData = [
    config.server.protocol,
    "://",
    config.credentials.username,
    ":",
    config.credentials.password,
    "@",
    config.server.address
  ];
  transporter = Nodemailer.createTransport(transportData.join(""));
  template = _template(Fs.readFileSync(paths.relocate(config.message.template)));
  mailOptions = {
    from: config.message.sender,
    to: config.message.recipients.join(","),
    subject: config.message.subject,
    html: template(config.message.data)
  };
  transporter.sendMail(mailOptions, function(error) {
    
    if (error)
    {
      tasks.error("email", callback, error);
    }
    else
    {
      tasks.success("email", callback);
    }
  });
});
