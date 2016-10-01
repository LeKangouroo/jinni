var fs = require('fs');
var inquirer = require('inquirer');
var logger = require('../modules/logger');
var path = require('path');
var ascii = fs.readFileSync(path.resolve(__dirname, '../assets/text/ascii.txt'), { encoding: 'utf8' });

logger.log(ascii);
logger.log("Hi! My name is Genie. Before I grant your wish, I'll need some informations about your project.");
inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    validate: (value) => (typeof value === 'string' && value.trim().length > 0),
    filter: (value) => value.trim()
  },
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Description:',
    validate: (value) => (typeof value === 'string' && value.trim().length > 0),
    filter: (value) => value.trim()
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author:',
    validate: (value) => (typeof value === 'string' && value.trim().length > 0),
    filter: (value) => value.trim()
  }
]).then((answers) => {

  console.log('processing answers');
  console.log(answers);
});
