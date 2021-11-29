import fs from 'fs';
import getNormalizePath from './utils.js';
import getDiff from './getDiff.js';
import getFormatter from './formatters/index.js';
import getParser from './parsers.js';

const getGeneralLogic = (path1, path2, formatName = 'stylish') => {
  const normalizePath1 = getNormalizePath(path1);
  const normalizePath2 = getNormalizePath(path2);

  const parserFromFile1 = getParser(normalizePath1);
  const parserFromFile2 = getParser(normalizePath2);

  const obj1 = parserFromFile1(fs.readFileSync(normalizePath1, 'utf-8'));
  const obj2 = parserFromFile2(fs.readFileSync(normalizePath2, 'utf-8'));

  const diff = getDiff(obj1, obj2);
  const format = getFormatter(formatName);
  return format(diff);
};

export default getGeneralLogic;
