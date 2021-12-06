import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import getDiff from './getDiff.js';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';

const getPath = (filepath) => {
  const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  return pathOffile;
};

const getTypeOfFile = (pathOfFile) => {
  const rawType = path.extname(pathOfFile);
  return _.startsWith(rawType, '.') ? rawType.slice(1) : rawType;
};

const readFile = (pathOfFile) => fs.readFileSync(pathOfFile, 'utf-8');

const genDiff = (path1, path2, formatName = 'stylish') => {
  const normalizePath1 = getPath(path1);
  const normalizePath2 = getPath(path2);

  const typeOfFile1 = getTypeOfFile(path1);
  const typeOfFile2 = getTypeOfFile(path2);

  const dataOfObj1 = readFile(normalizePath1);
  const dataOfObj2 = readFile(normalizePath2);

  const data1 = parse(typeOfFile1, dataOfObj1);
  const data2 = parse(typeOfFile2, dataOfObj2);

  const diff = getDiff(data1, data2);
  const format = getFormatter(formatName);

  return format(diff);
};

export default genDiff;
