import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import getGeneralLogic from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  ['file3.yml', 'file4.yaml', 'trullyStylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'trullyStylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'trullyPlain.txt', 'plain'],
  ['file1.json', 'file2.json', 'trullyJson.txt', 'json'],
];

test.each(cases)('Compare %s and %s to expect %s in "%s" style', (firstArg, secondArg, expectedResult, format) => {
  const firstFile = getFixturePath(firstArg);
  const secondFile = getFixturePath(secondArg);
  const getResult = readFile(expectedResult);
  const result = getGeneralLogic(firstFile, secondFile, format);
  expect(result).toEqual(getResult);
});
