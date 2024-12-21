import {enter, exit} from './log.js';

export {load} from './load.js';

// mock for arrow functions
global.arguments = [
    'cannot determine arguments',
];
global.__estrace = {
    enter,
    exit,
};
