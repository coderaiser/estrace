export const getLine = (path) => {
    return path.node?.loc?.start.line || '🤷';
};
