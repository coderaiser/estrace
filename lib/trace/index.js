import putout from 'putout';
import pluginTrace from './plugin-trace/index.js';

export default async function trace({source, url}) {
    const {code} = putout(source, {
        rules: {
            trace: ['on', {
                url,
            }],
        },
        plugins: [
            ['trace', pluginTrace],
        ],
    });
    
    return code;
}

