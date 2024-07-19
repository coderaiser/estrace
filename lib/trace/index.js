import putout from 'putout';
import {estracePlugin} from './plugin.js';

export default function trace({source, url}) {
    const {code} = putout(source, {
        rules: {
            'estrace/trace': ['on', {
                url,
            }],
        },
        plugins: [estracePlugin],
    });
    
    return code;
}
