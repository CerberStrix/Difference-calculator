import fs from 'fs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import { getDiff } from '../src/utils.js';
import getParser from '../src/parsers.js';
import trullyMass from '../__fixtures__/trullyAsnwer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDiff', () => {
  const parserFromFile1 = getParser(getFixturePath('file1.json'));
  const parserFromFile2 = getParser(getFixturePath('file2.json'));
  const obj1 = parserFromFile1((fs.readFileSync(getFixturePath('file1.json'), 'utf-8')));
  const obj2 = parserFromFile2((fs.readFileSync(getFixturePath('file2.json'), 'utf-8')));
  expect(getDiff(obj1, obj2)).toEqual(trullyMass);
});
