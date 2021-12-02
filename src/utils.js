import path from 'path';

const getNormalizePath = (filepath) => {
  const pathOffile = path.isAbsolute(filepath) ? filepath : path.resolve(process.cwd(), filepath);
  return pathOffile;
};

const getTypeOfFile = (pathOfFile) => path.extname(pathOfFile);

export { getNormalizePath, getTypeOfFile };
