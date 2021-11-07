#!/usr/bin/env node

import program from 'commander';
import getGeneralLogic from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    getGeneralLogic(filepath1, filepath2);
  })
  .helpOption('-h, --help', 'output usage information');

program.parse();
