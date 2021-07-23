import pluginTrace from './plugin-trace/index.js';
import pluginFixMultilineTemplateLiteralIndentation from './plugin-fix-multiline-template-literal-indentation/index.js';

export default {
    rules: {
        'trace': pluginTrace,
        'fix-multiline-template-literal-indentation': pluginFixMultilineTemplateLiteralIndentation,
    },
};

