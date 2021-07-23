import test from 'supertape';

test('estrace: plugin: rules', async (t) => {
    const plugin = await import('./plugin.js');
    
    t.ok(plugin.rules, 'should export rules for dynamic import');
    t.end();
});

test('estrace: plugin: default', async (t) => {
    const plugin = await import('./plugin.js');
    
    t.ok(plugin.default, 'should export default from import declaration');
    t.end();
});

