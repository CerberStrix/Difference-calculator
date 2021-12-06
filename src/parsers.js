import yaml from 'js-yaml';

const parse = (type, data) => {
  switch (type) {
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`${type} format is not supported`);
  }
};

export default parse;
