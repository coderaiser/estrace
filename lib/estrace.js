import {createRequire} from 'module';
import convertImports from './convert-imports/index.js';
import {createEstrace} from './estrace.js';

global.__esTrace = createEstrace();

const cache = global.__mockImportCache;
const reImports = global.__mockImportReImports;
const nextCount = () => ++global.__mockImportCounter;

export async function transformSource(source, context, defaultTransformSource) {
    const {url} = context;
    const {pathname} = new URL(url);
    
    if (reImports.has(pathname)) {
        const {resolve} = createRequire(pathname);
        const code = await convertImports({
            resolve,
            source: source.toString(),
            cache,
        });
        
        return {
            source: code,
        };
    }
    
    return defaultTransformSource(source, context, defaultTransformSource);
}

