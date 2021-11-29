import getFormatter from '../src/formatters/index.js';
import stylish from '../src/formatters/stylish.js';
import { getValueFromOutput, plain } from '../src/formatters/plain.js';

test('getFormatter', () => {
  expect(getFormatter('stylish')).toEqual(stylish);
  expect(getFormatter('plain')).toEqual(plain);
});

test('getValue', () => {
  expect(getValueFromOutput(null)).toEqual('null');
  expect(getValueFromOutput({ key: Object })).toEqual('[complex value]');
  expect(getValueFromOutput('string')).toEqual("'string'");
  expect(getValueFromOutput('')).toEqual('\' \'');
  expect(getValueFromOutput(true)).toEqual(true);
});
