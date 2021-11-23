const stylish = (value) => {
  const replacer = ' ';
  const spacesCount = 4;

  const simpleIter = (currentValue, depth = 1) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    if (currentValue === null) {
      return 'null';
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${simpleIter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const generalIter = (currentValue, depth) => {
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
          return `${currentIndent}${key}: ${generalIter(children, depth + 1)}`;
        case 'added':
          return `${indendForAdded}${key}: ${simpleIter(val, depth + 1)}`;
        case 'removed':
          return `${indendForRemove}${key}: ${simpleIter(val, depth + 1)} `;
        case 'same':
          return `${currentIndent}${key}: ${simpleIter(val, depth + 1)} `;
        case 'updated':
          return `${indendForRemove}${key}: ${simpleIter(val1, depth + 1)}\n${indendForAdded}${key}: ${simpleIter(val2, depth + 1)}`;
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

  const result = generalIter(value, 1);
  console.log(result);
};

export default stylish;
