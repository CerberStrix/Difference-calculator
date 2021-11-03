import _ from "lodash";
import fs from "fs";
import path from 'path';
import process from 'process';

const getDiff = (path1, path2) => {
const obj1 = fs.readFileSync(path1, 'utf-8');
const obj2 = fs.readFileSync(path2, 'utf-8');
console.log(obj1)
};
