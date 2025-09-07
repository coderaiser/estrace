import {safeAlign} from 'eslint-plugin-putout';
import {matchToFlat} from '@putout/eslint-flat';
import {defineConfig} from 'eslint/config';

export const match = {
    '*.md{js}': {
        'prefer-arrow-callback': 'off',
        'no-var': 'off',
    },
};
export default defineConfig([safeAlign, matchToFlat(match)]);
