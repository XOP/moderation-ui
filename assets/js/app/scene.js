/**
 * Scene
 *
 */


import * as utils from 'utils';

const IMAGES_COLLECTION = 3;
const CLAIMS_MAX = 20;

let imageNumber = 1;


/**
 * Format index with leading zero
 * @param n
 * @returns {*}
 */
function formatImageNumber(n) {
    return n > 9 ? n : '0' + n;
}


/**
 * Basic formatter for claims string
 * @param number
 * @returns {string}
 */
function formatClaims(number) {
    return number === 1 ? 'claim' : 'claims';
}


/**
 * Demo url string
 * @returns {*}
 */
function demoUrlFormatter() {
    var num = Math.round(Math.random() * (IMAGES_COLLECTION - 1) + 1);
    var imgNumber = formatImageNumber(num);

    return `img/test/${imgNumber}.jpg`;
}

/**
 * Add image to scene
 * @param parent
 * @returns {HTMLElement|*}
 */
export function addImage(parent, klass) {
    let img = new Image();
    let imgWrap = document.createElement('div');
    let url = demoUrlFormatter();

    imgWrap.className = 'scene_img js-image ' + klass;

    // mock data
    imgWrap.dataset.claims = Math.round(Math.random() * CLAIMS_MAX);
    imgWrap.dataset.number = imageNumber++;

    // add image to scene
    imgWrap.appendChild(img);
    parent.appendChild(imgWrap);
    img.src = url;

    return imgWrap;
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