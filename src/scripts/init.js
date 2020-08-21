/*
 * Dependencies
 */
import chalk from "chalk";
import fs from "fs";
import fse from "fs-extra";
import inquirer from "inquirer";
import * as logger from "../modules/logger.js";
import merge from "lodash/merge.js";
import os from "os";
import path from "path";
import packageNameValidator from "validate-npm-package-name";
import * as promises from "../modules/promises.js";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { readJSON } from "../modules/json.js";

/*
 * Constants
 */
const CURRENT_FILE_PATH = fileURLToPath(import.meta.url);
const ASCII_ART_FILE_PATH =  path.join(CURRENT_FILE_PATH, "..", "..", "assets", "text", "ascii.txt");
const ASCII_ART = fs.readFileSync(ASCII_ART_FILE_PATH, "utf8");
const BOILERPLATE_DIR = path.join(CURRENT_FILE_PATH, "..", "..", "..", "boilerplate");
const CWD = process.cwd();
const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;
const PACKAGE_FILE_PATH = path.resolve(CWD, "package.json");


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
    },
    {
      type: 'confirm',
      name: 'api',
      message: 'Do you need a fake REST API? (powered by json-server)'
    },
    {
      type: 'confirm',
      name: 'instrumentedTests',
      message: 'Do you need to use instrumented tests in a browser? (powered by cypress)'
    },
    {
      type: 'confirm',
      name: 'unitTests',
      message: 'Do you need to use unit tests? (powered by mocha)'
    }
  ]);
};

const bye = () => {

  logger.raw(chalk.green('\n\nYour wish has been granted!\n'));
  process.exit(EXIT_SUCCESS);
};

const fail = (msg, err) => {

  logger.error(msg);
  logger.trace(err);
  process.exit(EXIT_FAILURE);
};

const generateBoilerplate = (params) => {

  const copyOptions = { overwrite: false };

  const copyBaseFiles = params => new Promise(resolve => {

    fse.copySync(`${params.root}/types/base`, params.cwd);
    fs.renameSync(`${params.cwd}/gitignore`, `${params.cwd}/.gitignore`);
    fs.renameSync(`${params.cwd}/npmrc`, `${params.cwd}/.npmrc`);
    resolve();
  });
  const copyBoilerplateTypeFiles = params => new Promise(resolve => {

    fse.copySync(`${params.root}/types/${params.answers.boilerplateType}`, params.cwd, copyOptions);
    resolve();
  });
  const copyRESTApiFiles = params => new Promise(resolve => {

    fse.copySync(`${params.root}/features/api`, params.cwd, copyOptions);
    resolve();
  });
  const copyInstrumentedTestsFiles = params => new Promise(resolve => {

    fse.copySync(`${params.root}/features/instrumented-tests`, params.cwd, copyOptions);
    resolve();
  });
  const copyUnitTestsFiles = params => new Promise(resolve => {

    fse.copySync(`${params.root}/features/unit-tests`, params.cwd, copyOptions);
    resolve();
  });

  return new Promise((resolve, reject) => {

    const generationPromise = promises.seq([
      copyBaseFiles(params),
      copyBoilerplateTypeFiles(params),
      params.answers.api ? copyRESTApiFiles(params) : Promise.resolve(),
      params.answers.instrumentedTests ? copyInstrumentedTestsFiles(params) : Promise.resolve(),
      params.answers.unitTests ? copyUnitTestsFiles(params) : Promise.resolve()
    ]);
    generationPromise.then(() => resolve(params)).catch(reject);
  });
};

const install = () => {

  return new Promise((resolve, reject) => {

    logger.raw('\nThanks my friend! Now, let the magic happen...\n\n');

    const cmd = (os.type() === 'Windows_NT') ? 'npm.cmd' : 'npm';
    const proc = spawn(cmd, ['install'], { stdio: ['ignore', process.stdout, process.stderr] });

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

    let pkg = readJSON(PACKAGE_FILE_PATH);

    pkg.name = params.answers.projectName;
    pkg.description = params.answers.projectDescription;
    pkg.author = params.answers.author;

    /*
     * REST API feature
     */
    if (params.answers.api)
    {
      merge(pkg, readJSON(`${params.root}/features/api/package.json`));
    }

    /*
     * Instrumented tests feature
     */
    if (params.answers.instrumentedTests)
    {
      merge(pkg, readJSON(`${params.root}/features/instrumented-tests/package.json`));
    }

    /*
     * Unit tests feature
     */
    if (params.answers.unitTests)
    {
      merge(pkg, readJSON(`${params.root}/features/unit-tests/package.json`));
    }

    fs.writeFile(PACKAGE_FILE_PATH, JSON.stringify(pkg, null, 2), (err) => {

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
logger.raw(ASCII_ART);
logger.raw("Hi! My name is Genie. Before I grant your wish, I'll need some informations about your project.\n");
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
