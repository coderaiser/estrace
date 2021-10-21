import {readFile} from 'fs/promises';
import trace from './trace/index.js';
import {
    enter,
    exit,
} from './log.js';

// mock for arrow functions
global.arguments = ['cannot determine arguments'];
global.__estrace = {
    enter,
    exit,
};

export async function load(url) {
    const code = await readFile(url.replace('file://', ''));
    const {source} = await transformSource(code, {url});
    
    return {
        source,
        format: 'module',
    };
}

export async function transformSource(source, context) {
    const {url} = context;
    
    const code = await trace({
        source: source.toString(),
        url,
    });
    
    return {
        source: code,
    };
}

