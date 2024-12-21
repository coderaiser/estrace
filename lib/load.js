import trace from './trace/index.js';

export async function load(url, context, nextLoad) {
    const {format} = context;
    
    if (format !== 'module')
        return {
            format,
            shortCircuit: true,
        };
    
    const {source} = await nextLoad(url, context);
    
    const code = await trace({
        source: source.toString(),
        url,
    });
    
    return {
        format,
        source: code,
    };
}
