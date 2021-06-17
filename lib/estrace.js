import trace from './trace/index.js';

// mock for arrow functions
global.arguments = ['cannot determine arguments'];
global.__estrace = {
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

let i = 1;

function enter(name, args, url) {
    i *= 2;
    console.log(`${Array(i).join('.')}.💣  ${name}(${Array.from(args).join(', ')})`, String(url));
}

function exit(name, result, url) {
    console.log(`${Array(i).join('.')}.💥 ${name} ->`, result, String(url));
    i /= 2;
}

