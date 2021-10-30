#!/usr/bin/env node

import { program } from "commander";

program
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>, <filepath2>')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
  

program.parse();