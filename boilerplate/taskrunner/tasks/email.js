import argv from '../modules/argv';
import fs from 'fs';
import git from '../modules/git';
import gulp from 'gulp';
import nodemailer from 'nodemailer';
import paths from '../modules/paths';
import tasks from '../modules/tasks';
import template from 'lodash/template';

gulp.task('email', (callback) => {

  const config = require(paths.relocate('config/tasks/email.json'));
  const transportData = [
    config.server.protocol,
    '://',
    config.credentials.username,
    ':',
    config.credentials.password,
    '@',
    config.server.address
  ];
  const transporter = nodemailer.createTransport(transportData.join(''));
  const tpl = template(fs.readFileSync(paths.relocate(config.message.template)));
  const data = config.message.data;

  git.changelog({ start: argv.start, end: argv.end || 'HEAD', format: 'html' }).then(
    (outputString) => {

      data.changelog = outputString;
      const mailOptions = {
        from: config.message.sender,
        to: config.message.recipients.join(','),
        subject: config.message.subject,
        html: tpl(data)
      };
      transporter.sendMail(mailOptions, (error) => {

        if (error)
        {
          tasks.error('email', callback, error);
        }
        else
        {
          tasks.success('email', callback);
        }
      });
    },
    (err) => tasks.error('email', callback, err)
  );
});