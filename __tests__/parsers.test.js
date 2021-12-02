import yaml from 'js-yaml';
import getParser from '../src/parsers.js';

test('getParser', () => {
  expect(getParser('.json')).toEqual(JSON.parse);
  expect(getParser('.yaml')).toEqual(yaml.load);
  expect(getParser('.yml')).toEqual(yaml.load);
});
