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
      return `${replacer.repeat(indentSize - spacesCount)}}`;
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
    `${getIndent(depth, 'bracket')}`,
  ].join('\n');
};

const getStylish = (value) => {
  const iter = (currentValue, depth) => {
    const lines = currentValue.map((item) => {
      const {
        type, key, children, val, val1, val2,
      } = item;
      switch (type) {
        case 'nested':
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
      `${getIndent(depth, 'bracket')}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default getStylish;
