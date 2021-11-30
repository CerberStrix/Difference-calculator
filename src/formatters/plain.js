const getValueFromOutput = (value) => {
  if (value === null) {
    return 'null';
  } if (typeof value === 'object') {
    return '[complex value]';
  } if (value === '') {
    return '\'\'';
  } if (typeof value === 'boolean') {
    return value;
  } if (typeof value === 'number') {
    return Number(value);
  }
  return `'${value}'`;
};

const plain = (value) => {
  const iterPlain = (currentValue, oldPath) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'same')
      .flatMap((item) => {
        const {
          type, key, children, val, val1, val2,
        } = item;
        const newPath = [...oldPath, key];
        const pathFromOutput = newPath.join('.');
        switch (type) {
          case 'recursion':
            return iterPlain(children, newPath);
          case 'added':
            return `Property '${pathFromOutput}' was added with value: ${getValueFromOutput(val)}`;
          case 'removed':
            return `Property '${pathFromOutput}' was removed`;
          case 'updated':
            return `Property '${pathFromOutput}' was updated. From ${getValueFromOutput(val1)} to ${getValueFromOutput(val2)}`;
          default:
            throw new Error(`Unknown type: '${type}'!`);
        }
      });

    return [
      ...lines,
    ].join('\n');
  };

  const result = iterPlain(value, []);
  return result;
};

export { getValueFromOutput, plain };
