/*
 * Dependencies
 */
// TODO: rewrites this using import syntax when it's available in Node
const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const logger = require('../modules/logger');
const ncp = require('ncp').ncp;
const path = require('path');
const packageNameValidator = require('validate-npm-package-name');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;


/*
 * Constants
 */
const ASCII_ART = fs.readFileSync(path.resolve(__dirname, '../assets/text/ascii.txt'), { encoding: 'utf8' });
const BOILERPLATE_DIR = path.resolve(__dirname, '../../boilerplate');
const CWD = process.cwd();
const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;


/*
 * Functions
 */
const askQuestions = () => {

  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (value) => {

        if (typeof value === 'string' && value.trim().length > 0)
        {
          const PKG_NAME_VALIDATION = packageNameValidator(value);

          if (PKG_NAME_VALIDATION.validForNewPackages)
          {
            return true;
          }
          PKG_NAME_VALIDATION.errors.forEach((err) => logger.log('\n' + chalk.red(err)));
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
  ]);
};

const bye = () => {

  logger.log(chalk.green('\n\nYour wish has been granted!\n'));
  process.exit(EXIT_SUCCESS);
};

const fail = (msg, err) => {

  logger.error(msg);
  logger.trace(err);
  process.exit(EXIT_FAILURE);
};

const generateBoilerplate = (params) => {

  return new Promise((resolve, reject) => {

    const NCP_OPTIONS = { stopOnErr: true };

    ncp(`${params.root}/_common`, params.cwd, NCP_OPTIONS, (err) => {

      if (err)
      {
        return reject(err);
      }
      ncp(`${params.root}/${params.answers.boilerplateType}`, params.cwd, NCP_OPTIONS, (err) => {

        if (err)
        {
          return reject(err);
        }
        fs.renameSync(`${params.cwd}/gitignore`, `${params.cwd}/.gitignore`);
        fs.renameSync(`${params.cwd}/npmrc`, `${params.cwd}/.npmrc`);
        resolve(params);
      });
    });
  });
};

const install = () => {

  return new Promise((resolve, reject) => {

    logger.log('\nThanks my friend! Now, let the magic happen...\n\n');

    const proc = spawn('npm', ['install'], { stdio: ['ignore', process.stdout, process.stderr] });

    proc.on('error', (err) => {

      logger.warning('Master, I failed to install the dependencies because of the following error:');
      logger.trace(err);
      logger.info('You can still do it yourself by using the "npm install" command');
      resolve();
    });

    proc.on('close', (code) => {

      if (code !== 0)
      {
        return reject(code);
      }
      resolve();
    });
  });
};

const savePackage = (params) => {

  return new Promise((resolve, reject) => {

    const PACKAGE_FILE_PATH = path.resolve(params.cwd, './package.json');
    const PACKAGE = require(PACKAGE_FILE_PATH);

    PACKAGE.name = params.answers.projectName;
    PACKAGE.description = params.answers.projectDescription;
    PACKAGE.author = params.answers.author;

    fs.writeFile(PACKAGE_FILE_PATH, JSON.stringify(PACKAGE, null, 2), (err) => {

      if (err)
      {
        return reject(err);
      }
      resolve(params);
    });
  });
};


/*
 * Execution
 */
logger.log(ASCII_ART);
logger.log("Hi! My name is Genie. Before I grant your wish, I'll need some informations about your project.\n");
askQuestions()
.then(
  (answers) => generateBoilerplate({answers: answers, cwd: CWD, root: BOILERPLATE_DIR}),
  (err) => fail('an error occured during questions asking phase', err)
).then(
  (context) => savePackage(context),
  (err) => fail('an error occured during boilerplate generation phase', err)
).then(
  () => install(),
  (err) => fail('an error occured during package generation phase', err)
).then(
  () => bye(),
  (err) => fail('an error occured during installation phase', err)
);
