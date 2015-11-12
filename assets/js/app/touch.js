/**
 * Touch
 *
 */


import * as utils from 'utils';


/**
 * Resolve action type
 * @param event
 * @returns {*}
 */
export function resolveAction(event) {
    let action;

    switch(event.type) {
        case 'panleft':
            action = 'no';
            break;
        case 'panright':
            action = 'yes';
            break;
        case 'panup':
            action = 'skip';
            break;
    }

    return action;
}