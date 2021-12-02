import fs from 'fs';
import { getNormalizePath, getTypeOfFile } from './utils.js';
import getDiff from './getDiff.js';
import getFormatter from './formatters/index.js';
import getParser from './parsers.js';

const getGeneralLogic = (path1, path2, formatName = 'stylish') => {
  const normalizePath1 = getNormalizePath(path1);
  const normalizePath2 = getNormalizePath(path2);

  const parserForFile1 = getParser(getTypeOfFile(path1));
  const parserForFile2 = getParser(getTypeOfFile(path2));

  const obj1 = parserForFile1(fs.readFileSync(normalizePath1, 'utf-8'));
  const obj2 = parserForFile2(fs.readFileSync(normalizePath2, 'utf-8'));

  const diff = getDiff(obj1, obj2);
  const format = getFormatter(formatName);
  return format(diff);
};

export default getGeneralLogic;
