import yaml from 'js-yaml';
import getParser from '../src/parsers.js';

test('getParser', () => {
  expect(getParser('/home/alisher/file1.json')).toEqual(JSON.parse);
  expect(getParser('/home/alisher/file1.yaml')).toEqual(yaml.load);
  expect(getParser('/home/alisher/file1.yml')).toEqual(yaml.load);
});
