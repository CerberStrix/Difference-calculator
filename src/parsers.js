import yaml from 'js-yaml';
import path from 'path';

const getParser = (pathOfFile) => {
  let parse;
  const format = path.extname(pathOfFile);

  if (format === '') {
    parse = JSON.parse;
  } else if (format === '.yaml') {
    parse = yaml.load;
  } else if (format === '.yml') {
    parse = yaml.load;
  } else if (format === '.json') {
    parse = JSON.parse;
  }
  return parse;
};

export default getParser;
