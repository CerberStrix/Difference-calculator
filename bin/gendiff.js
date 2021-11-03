#!/usr/bin/env node

import program from "commander";

import { getObjectFromPath, getDiff } from "./utils.js";


program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .option('-V, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    const obj1 = getObjectFromPath(filepath1);
    const obj2 = getObjectFromPath(filepath2);
    console.log(getDiff(obj1, obj2));
  })
  .helpOption('-h, --help', 'output usage information');
  

program.parse();