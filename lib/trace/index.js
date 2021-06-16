import putout from 'putout';

import pluginTrace from './plugin-trace/index.js';

export default async function trace({resolve, source, cache}) {
    const {code} = putout(source, {
        rules: {
            'trace': ['on', {
                cache,
            }],
        },
        plugins: [
            ['trace', pluginTrace],
        ],
    });
    
    return code;
}

