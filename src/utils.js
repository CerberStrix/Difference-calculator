import path from 'path';

const getNormalizePath = (filepath) => {
  const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  return pathOffile;
};

const getTypeOfFile = (pathOfFile) => path.extname(pathOfFile);

const getIndent = (depth, type = 'none') => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  switch (type) {
    case 'added':
      return `${replacer.repeat(indentSize - 2)}+ `;
    case 'removed':
      return `${replacer.repeat(indentSize - 2)}- `;
    case 'bracket':
      return replacer.repeat(indentSize - spacesCount);
    default:
      return replacer.repeat(indentSize);
  }
};

const stringlify = (node, depth = 1) => {
  if (typeof node !== 'object') {
    return node.toString();
  }
  if (node === null) {
    return 'null';
  }
  const lines = Object
    .entries(node)
    .map(([key, val]) => `${getIndent(depth)}${key}: ${stringlify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${getIndent(depth, 'bracket')}}`,
  ].join('\n');
};

export {
  getNormalizePath, getTypeOfFile, getIndent, stringlify,
};
