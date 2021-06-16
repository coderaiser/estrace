import {createRequire} from 'module';
import trace from './trace/index.js';

export async function transformSource(source, context) {
    const {url} = context;
    const {pathname} = new URL(url);
    
    const {resolve} = createRequire(pathname);
    const code = await trace({
        resolve,
        source: source.toString(),
        cache: null,
    });
    
    return {
        source: code,
    };
}

