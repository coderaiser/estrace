import trace from './trace/index.js';
import {toLoad} from './to-load.js';
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

export const load = toLoad(transformSource);

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

