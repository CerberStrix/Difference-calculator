import path from 'path';
import _ from 'lodash';

const getNormalizePath = (filepath) => {
  const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  return pathOffile;
};

const getDiff = (obj1, obj2) => {
  const allKeys = _.union([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortedKeys = _.sortBy(allKeys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { type: 'added', key, val: value2 };
    }
    if (!_.has(obj2, key)) {
      return { type: 'removed', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: getDiff(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }
    return { type: 'same', key, val: value1 };
  });
};

export { getNormalizePath, getDiff };
