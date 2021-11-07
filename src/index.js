import fs from 'fs';
import { getNormalizePath, getDiff, printAnswer } from './utils.js';
import getParser from './parsers.js';

const getGeneralLogic = (path1, path2) => {
  const normalizePath1 = getNormalizePath(path1);
  const normalizePath2 = getNormalizePath(path2);

  const parserFromFile1 = getParser(normalizePath1);
  const parserFromFile2 = getParser(normalizePath2);

  const obj1 = parserFromFile1(fs.readFileSync(normalizePath1, 'utf-8'));
  const obj2 = parserFromFile2(fs.readFileSync(normalizePath2, 'utf-8'));
  const result = getDiff(obj1, obj2);
  printAnswer(result);
};

export default getGeneralLogic;
