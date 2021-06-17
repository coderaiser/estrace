import trace from './trace/index.js';

// mock for arrow functions
global.arguments = ['cannot determine arguments'];
global.__esTrace = {
    enter,
    exit,
};

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

function enter(name, args, url) {
    console.log(`enter ${name}`, Array.from(args), `(${url})`);
}

function exit(name, url) {
    console.log(`exit ${name} (${url})`);
}

