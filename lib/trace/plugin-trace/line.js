export const getLine = (path) => path.node?.loc?.start.line || 'cannot determine line number';
