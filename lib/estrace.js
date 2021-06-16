import trace from './trace/index.js';

// mock for arrow functions
global.arguments = ['cannot determine arguments'];

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

