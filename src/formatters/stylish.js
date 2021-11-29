const stringlify = (node, depth = 1) => {
  if (typeof node !== 'object') {
    return node.toString();
  }
  if (node === null) {
    return 'null';
  }
  const replacer = ' ';
  const spacesCount = 4;
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object
    .entries(node)
    .map(([key, val]) => `${currentIndent}${key}: ${stringlify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (value) => {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const indendForAdded = `${replacer.repeat(indentSize - 2)}+ `;
    const indendForRemove = `${replacer.repeat(indentSize - 2)}- `;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentValue.map((item) => {
      const {
        type, key, children, val, val1, val2,
      } = item;
      switch (type) {
        case 'recursion':
          return `${currentIndent}${key}: ${iter(children, depth + 1)}`;
        case 'added':
          return `${indendForAdded}${key}: ${stringlify(val, depth + 1)}`;
        case 'removed':
          return `${indendForRemove}${key}: ${stringlify(val, depth + 1)} `;
        case 'same':
          return `${currentIndent}${key}: ${stringlify(val, depth + 1)} `;
        case 'updated':
          return `${indendForRemove}${key}: ${stringlify(val1, depth + 1)}\n${indendForAdded}${key}: ${stringlify(val2, depth + 1)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const result = iter(value, 1);
  return result;
};

export default stylish;
