/**
 * Scene
 *
 *
 */


import * as utils from 'utils';

const IMAGES_COLLECTION = 3;


/**
 * Format index with leading zero
 * @param n
 * @returns {*}
 */
function formatImageNumber(n) {
    return n > 9 ? n : '0' + n;
}


/**
 * Add image to scene
 * @param parent
 * @returns {HTMLElement|*}
 */
export function addImage(parent) {
    var img = new Image();
    var imgWrap = document.createElement('div');

    imgWrap.className = 'scene_img js-image';
    imgWrap.appendChild(img);

    var num = Math.round(Math.random() * (IMAGES_COLLECTION - 1) + 1);
    var imgNumber = formatImageNumber(num);
    var url = `img/test/${imgNumber}.jpg`;

    parent.appendChild(imgWrap);
    img.src = url;

    return imgWrap;
}


/**
 * CSS class depending on action
 * @param action
 * @returns {string}
 */
export function getImageClass(action) {
    return '__' + action.toLowerCase();
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
