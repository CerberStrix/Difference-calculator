import yaml from 'js-yaml';
import path from 'path';

const getParser = (pathOfFile) => {
  const format = path.extname(pathOfFile);
  if (format === '.yaml' || format === '.yml') {
    return yaml.load;
  }
  return JSON.parse;
};

export default getParser;
