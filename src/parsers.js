import yaml from 'js-yaml';

const getParser = (type) => {
  switch (type) {
    case '.yaml':
      return yaml.load;
    case '.yml':
      return yaml.load;
    case '.json':
      return JSON.parse;
    default:
      throw new Error(`${type} format is not supported`);
  }
};

export default getParser;
