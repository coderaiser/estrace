import process from 'node:process';

export {load} from './load.js';

const {entries} = Object;
const funcs = {};
const noop = () => {};
const compare = (a, b) => b.count - a.count;

// mock for arrow functions
global.arguments = [];
global.__estrace = {
    enter,
    exit: noop,
};

process.on('exit', () => {
    const array = convert(funcs);
    const sorted = array
        .sort(compare)
        .slice(0, 10);
    
    const result = merge(sorted);
    
    for (const [url, places] of entries(result)) {
        console.log(url);
        
        for (const {name, count} of places) {
            console.log(count, name);
        }
    }
});

function enter(name, url) {
    funcs[url] = funcs[url] || {};
    funcs[url][name] = funcs[url][name] || 0;
    
    ++funcs[url][name];
}

export function convert(object) {
    const result = [];
    
    for (const [url, data] of entries(object)) {
        const [name, count] = entries(data)[0];
        const urlSplit = url.split(':');
        const loc = urlSplit.pop();
        const newUrl = urlSplit.join(':');
        
        result.push({
            url: newUrl,
            name: `${name}:${loc}`,
            count,
        });
    }
    
    return result;
}

export function merge(funcs) {
    const result = {};
    
    for (const {url, name, count} of funcs) {
        result[url] = result[url] || [];
        
        result[url].push({
            name,
            count,
        });
    }
    
    return result;
}
