import stylish from './stylish.js';
import { plain } from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'stylish':
      return stylish;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`${formatName} format is not supported`);
  }
};

export default getFormatter;
