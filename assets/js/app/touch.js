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

    if(event.type.includes('left')) {
        action = 'no';
    } else if(event.type.includes('right')) {
        action = 'yes';
    } else if(event.type.includes('up')) {
        action = 'skip';
    }

    return action;
}