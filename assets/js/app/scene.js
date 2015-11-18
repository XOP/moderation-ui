/**
 * Scene
 *
 */


import * as utils from 'utils';
import * as post from 'post';
import * as config from '../config';

let imageNumber = 1;

const container = getContainer();


/**
 * Basic formatter for claims string
 * @param number
 * @returns {string}
 */
function formatClaims(number) {
    return parseInt(number, 10) === 1 ? 'claim' : 'claims';
}


/**
 * Add image to scene
 * @param parent
 * @returns {HTMLElement|*}
 */
export function addImage(klass, params, cb) {
    let img = new Image();
    let imgWrap = document.createElement('div');

    // add image to scene
    imgWrap.className = 'scene_img js-image ' + klass;
    imgWrap.classList.add('__loading');
    imgWrap.appendChild(img);
    container.appendChild(imgWrap);

    return post.getData(params).then(function(obj) {
        let data = obj;

        if (config.DEBUG) {
            console.log('RESPONSE: ' + JSON.stringify(obj));
        }

        // todo: timeout loading error

        // update item data
        imgWrap.dataset.claims = data.post.complaints;
        imgWrap.dataset.number = imageNumber++;
        imgWrap.dataset.id = data.post.postId;

        // set src
        img.src = data.url !== null ? data.url : config.STUB_SRC;

        // callback
        if (cb && typeof cb === 'function') {
            cb.call(imgWrap);
        }

        // stop loading
        setTimeout(function() {
            imgWrap.classList.remove('__loading');
        }, config.ANIMATION_TIME);

        return imgWrap;
    });
}


/**
 * Change state of image
 * @param image
 */
export function updateState(image) {
    image.classList.remove('__next');
    image.classList.add('__current');
}


/**
 * CSS class depending on action
 * @param action
 * @returns {string}
 */
export function getImageClass(action) {
    return '__' + action;
}


/**
 * DOM element scene contatiner
 * @returns {*|Node}
 */
export function getContainer() {
    return utils.find('.js-scene');
}


/**
 * DOM element current image
 * @returns {*|Node|Collection|V|Mixed}
 */
export function getCurrentImage() {
    return utils.find('.js-image.__current');
}


/**
 * DOM element next image
 * @returns {*|Node|Collection|V|Mixed}
 */
export function getNextImage() {
    return utils.find('.js-image.__next');
}


/**
 * Claims number counter
 * @param claims
 * @returns {string}
 */
export function getClaims(claims) {
    return claims + ' ' + formatClaims(claims);
}


/**
 * Current image number
 * @param val
 * @returns {*}
 */
export function getNumber(val) {
    return val;
}


/**
 * Resets image number
 */
export function resetImageNumber() {
    return imageNumber = 1;
}
