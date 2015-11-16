/**
 * Scene
 *
 */


import * as utils from 'utils';
import * as post from 'post';

let imageNumber = 1;


/**
 * Basic formatter for claims string
 * @param number
 * @returns {string}
 */
function formatClaims(number) {
    return number === 1 ? 'claim' : 'claims';
}


/**
 * Add image to scene
 * @param parent
 * @returns {HTMLElement|*}
 */
export function addImage(parent, klass, cb) {
    let img = new Image();
    let imgWrap = document.createElement('div');

    return post.getData().then(function(obj) {
        let data = obj;

        imgWrap.className = 'scene_img js-image ' + klass;

        // mock data
        imgWrap.dataset.claims = data.post.complaints;
        imgWrap.dataset.number = imageNumber++;

        // add image to scene
        imgWrap.appendChild(img);
        parent.appendChild(imgWrap);
        img.src = data.url;

        // callback
        if (cb && typeof cb === 'function') {
            cb.call(imgWrap);
        }

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
