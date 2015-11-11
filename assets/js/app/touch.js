/**
 * Touch
 *
 *
 */


import * as utils from 'utils';


export function resolveAction(event) {
    let action;

    switch(event.type) {
        case 'swipeleft':
            action = 'no';
            break;
        case 'swiperight':
            action = 'yes';
            break;
        case 'swipeup':
            action = 'skip';
            break;
    }

    return action;
}