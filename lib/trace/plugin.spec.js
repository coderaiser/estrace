import test from 'supertape';
import putout from 'putout';
import montag from 'montag';

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

test('estrace: plugin: export: tuple', async (t) => {
    const {estracePlugin} = await import('./plugin.js');
    const source = 'const f = () => {}';
    
    const {code} = putout(source, {
        rules: {
            'estrace/trace': ['on', {
                url: 'x',
            }],
        },
        plugins: [estracePlugin],
    });
    
    const expected = montag`
        const f = () => {
            try {
                var __estrace_context = __estrace.enter('<anonymous:1>', 'x:1', arguments);
            } finally {
                __estrace.exit('<anonymous:1>', 'x:1', __estrace_context);
            }
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('estrace: plugin: usual export', async (t) => {
    const estrace = await import('./plugin.js');
    const source = 'const f = () => {}';
    const expected = montag`
        const f = () => {
            try {
                var __estrace_context = __estrace.enter('<anonymous:1>', 'x:1', arguments);
            } finally {
                __estrace.exit('<anonymous:1>', 'x:1', __estrace_context);
            }
        };\n
    `;
    
    const {code} = putout(source, {
        rules: {
            'estrace/trace': ['on', {
                url: 'x',
            }],
        },
        plugins: [
            ['estrace', estrace],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});
