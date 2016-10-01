var fs = require('fs');
var inquirer = require('inquirer');
var logger = require('../modules/logger');
var ncp = require('ncp').ncp;
var path = require('path');
var pkg = require('../templates/package.json');

var ascii,
    boilerplateDir,
    cwd;

ascii = fs.readFileSync(path.resolve(__dirname, '../assets/text/ascii.txt'), { encoding: 'utf8' });
boilerplateDir = path.resolve(__dirname, '../../boilerplate');
cwd = process.cwd();
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

  ncp(boilerplateDir, cwd, { stopOnErr: true }, (err) => {

    if (err)
    {
      logger.trace(err);
      process.exit(1);
    }
    // NOTE: some files are ignored during module packaging. so we need to rename them manually
    fs.renameSync(path.resolve(cwd, './gitignore'), path.resolve(cwd, './.gitignore'));
    fs.renameSync(path.resolve(cwd, './npmrc'), path.resolve(cwd, './.npmrc'));
    pkg.name = answers.projectName;
    pkg.description = answers.projectDescription;
    pkg.author = answers.author;
    fs.writeFileSync(path.resolve(cwd, './package.json'), JSON.stringify(pkg, null, 2));
  });
});
