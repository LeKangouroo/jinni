// TODO: rewrites this using import syntax when it's available in Node
const chalk = require('chalk');
const config = require('../config/commands/init.json');
const fs = require('fs');
const inquirer = require('inquirer');
const logger = require('../modules/logger');
const ncp = require('ncp').ncp;
const path = require('path');
const packageNameValidator = require('validate-npm-package-name');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;

const ascii = fs.readFileSync(path.resolve(__dirname, '../assets/text/ascii.txt'), { encoding: 'utf8' });
const boilerplateDir = path.resolve(__dirname, '../../boilerplate');
const cwd = process.cwd();

logger.log(ascii);
logger.log("Hi! My name is Genie. Before I grant your wish, I'll need some informations about your project.\n");
inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    validate: (value) => {

      if (typeof value === 'string' && value.trim().length > 0)
      {
        const pkgNameValidation = packageNameValidator(value);

        if (pkgNameValidation.validForNewPackages)
        {
          return true;
        }
        pkgNameValidation.errors.forEach((err) => logger.log('\n' + chalk.red(err)));
      }
      return false;
    },
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
  },
  {
    type: 'list',
    name: 'boilerplateType',
    message: 'Boilerplate type:',
    choices: [
      {
        name: 'Classic',
        value: 'classic'
      },
      {
        name: 'Single Page Application',
        short: 'S.P.A.',
        value: 'spa'
      }
    ]
  }
]).then((answers) => {

  ncp(boilerplateDir, cwd, { stopOnErr: true }, (err) => {

    if (err)
    {
      logger.trace(err);
      process.exit(1);
    }

    const deletions = config[answers.boilerplateType].paths.deletions;
    const renamings = config.common.paths.renamings.concat(config[answers.boilerplateType].paths.renamings);
    const pkgPath = path.resolve(cwd, './package.json');
    const pkg = require(pkgPath);

    deletions.forEach((glob) => rimraf(path.resolve(cwd, glob), (err) => {

      if (err)
      {
        logger.error('Error during file / directory deletion');
        logger.error(err);
        process.exit(1);
      }
    }));
    renamings.forEach((item) => fs.rename(item.oldPath, item.newPath, (err) => {

      if (err)
      {
        logger.error('Error during file / directory renaming');
        logger.error(err);
        process.exit(1);
      }
    }));
    pkg.name = answers.projectName;
    pkg.description = answers.projectDescription;
    pkg.author = answers.author;
    config[answers.boilerplateType].nodeModules.deletions.forEach((item) => delete pkg.dependencies[item]);
    fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2), (err) => {

      if (err)
      {
        logger.error('Error during package.json generation');
        logger.error(err);
        process.exit(1);
      }

      logger.log('\nThanks my friend! Now, let the magic happen...\n\n');

      const npmInstall = spawn('npm', ['install'], { stdio: ['ignore', process.stdout, process.stderr] });

      npmInstall.on('close', (code) => {

        if (code === 0)
        {
          logger.success('Your project boilerplate is ready! Check the README.md file to learn how to use it :)');
        }
        process.exit(code);
      });
    });
  });
});
