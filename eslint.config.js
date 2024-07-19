import {safeAlign} from 'eslint-plugin-putout/config';
import {matchToFlat} from '@putout/eslint-flat';

export const match = {
    '*.md{js}': {
        'prefer-arrow-callback': 'off',
        'no-var': 'off',
    },
};
export default [
    ...safeAlign,
    ...matchToFlat(match),
];
