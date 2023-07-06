export const getLine = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isExportDeclaration())
        return parentPath.node.loc.start.line;
    
    return path.node?.loc?.start.line || '🤷';
};
