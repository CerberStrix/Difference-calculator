import { getIndent, stringlify } from '../utils.js';

const getStylish = (value) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((item) => {
      const {
        type, key, children, val, val1, val2,
      } = item;
      switch (type) {
        case 'recursion':
          return `${getIndent(depth, type)}${key}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${getIndent(depth, type)}${key}: ${stringlify(val, depth + 1)}`;
        case 'removed':
          return `${getIndent(depth, type)}${key}: ${stringlify(val, depth + 1)}`;
        case 'same':
          return `${getIndent(depth, type)}${key}: ${stringlify(val, depth + 1)}`;
        case 'updated':
          return `${getIndent(depth, 'removed')}${key}: ${stringlify(val1, depth + 1)}\n${getIndent(depth, 'added')}${key}: ${stringlify(val2, depth + 1)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });

    return [
      '{',
      ...lines,
      `${getIndent(depth, 'bracket')}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default getStylish;
