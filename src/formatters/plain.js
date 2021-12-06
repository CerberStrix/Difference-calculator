const getValueForOutput = (value) => {
  if (value === '') {
    return '\'\'';
  } if (value === null) {
    return 'null';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const getPlain = (tree) => {
  const iterPlain = (node, path) => {
    const lines = node
      .filter(({ type }) => type !== 'same')
      .flatMap((item) => {
        const {
          type, key, children, val, val1, val2,
        } = item;
        const newPath = [...path, key];
        const pathForOutput = newPath.join('.');
        switch (type) {
          case 'nested':
            return iterPlain(children, newPath);
          case 'added':
            return `Property '${pathForOutput}' was added with value: ${getValueForOutput(val)}`;
          case 'removed':
            return `Property '${pathForOutput}' was removed`;
          case 'updated':
            return `Property '${pathForOutput}' was updated. From ${getValueForOutput(val1)} to ${getValueForOutput(val2)}`;
          default:
            throw new Error(`Unknown type: '${type}'!`);
        }
      });

    return [
      ...lines,
    ].join('\n');
  };

  return iterPlain(tree, []);
};

export default getPlain;
