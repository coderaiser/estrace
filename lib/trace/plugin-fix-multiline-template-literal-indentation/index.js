export const report = () => 'fix newlines in multiline template literals';

export const fix = ({node}) => {
    const {raw} = node.value;
    
    //node.value.raw = raw.replace(/\n(\s+)?/g, '\\n');
    node.value.raw = raw.replace(/\n/g, '\\n');
    // recast walk around over
    // spaces produced after each new line
    node.original = null;
};

export const traverse = ({push}) => ({
    TemplateLiteral(path) {
        for (const quasisPath of path.get('quasis')) {
            const {value} = quasisPath.node;
            const {raw} = value;
            
            if (raw.includes('\n'))
                push(quasisPath);
        }
    },
});

export default {
    report,
    fix,
    traverse,
};
