import putout from 'putout';
import estrace from './plugin.js';

export default function trace({source, url}) {
    const {code} = putout(source, {
        rules: {
            'estrace/trace': ['on', {
                url,
            }],
        },
        plugins: [
            ['estrace', estrace],
        ],
    });
    
    return code;
}

