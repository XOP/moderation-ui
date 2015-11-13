/**
 * Controls
 *
 */


import * as utils from 'utils';

let controlCont = utils.find('.js-control-cont');


/**
 * Disable controls
 */
export function disable() {
    controlCont.classList.add('__disabled');
}


/**
 * Enable controls
 */
export function enable() {
    controlCont.classList.remove('__disabled');
}


/**
 * Retrieve control action
 * @param control
 * @returns {null|string|*}
 */
export function resolveAction(control) {
    return control.dataset.action;
}


/**
 * Retrieve keypress action
 * @param evt
 * @returns {*}
 */
export function resolveKeypress(evt) {
    let action;
    let key = evt.keyCode;

    switch(key) {
        case 37:
            action = 'no';
            break;
        case 39:
            action = 'yes';
            break;
        case 38:
            action = 'skip';
            break;
    }

    return action;
}
