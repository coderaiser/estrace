import putout from 'putout';
import pluginTrace from './plugin-trace/index.js';
import pluginFixMultilineTemplateLiteralIndentation from './plugin-fix-multiline-template-literal-indentation/index.js';

export default async function trace({source, url}) {
    const {code} = putout(source, {
        rules: {
            trace: ['on', {
                url,
            }],
        },
        plugins: [
            ['trace', pluginTrace],
            ['fix-multiline-template-literal-indentation', pluginFixMultilineTemplateLiteralIndentation],
        ],
    });
    
    return code;
}

