export const toLoad = (transformSource) => async (url, context, defaultLoad) => {
    const {source: rawSource} = await defaultLoad(url, context);
    
    if (!rawSource)
        return {
            format: 'commonjs',
        };
    
    const {source} = await transformSource(rawSource, {
        url,
    });
    
    return {
        source,
        format: 'module',
    };
};
