import path from 'path';
import fs from "fs";
import _ from "lodash";

const getObjectFromPath = (filepath) => {
    const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
    const obj = JSON.parse(fs.readFileSync(pathOffile, 'utf-8'));
    return obj;
};

const getDiff = (obj1, obj2) => {
    const allKeys = _.sortBy(_.union([...Object.keys(obj1), ...Object.keys(obj2)]));
    const cb = (acc, key) => {
      const valueOfobj1 = obj1[key];
      const valueOfobj2 = obj2[key];
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (valueOfobj1 === valueOfobj2) {
          acc.push(`    ${key}: ${valueOfobj1}`);
        } else {
          acc.push(`  - ${key}: ${valueOfobj1}`);
          acc.push(`  + ${key}: ${valueOfobj2}`);
        }
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        acc.push(`  - ${key}: ${valueOfobj1}`);
      } 
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        acc.push(`  + ${key}: ${valueOfobj2}`);
      }
      return acc;
    };
  
    const result = allKeys.reduce(cb, [])
    const innerValue = result.join('\n');
    const parts = `{\n${innerValue}\n}`;
    return parts;
  };

export { getObjectFromPath, getDiff };