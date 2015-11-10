/**
 * Scene
 *
 *
 */


var utils = require('utils')();
var number = 3;


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
function addImage(parent) {
    var img = new Image();
    var imgWrap = document.createElement('div');

    imgWrap.className = 'scene_img js-image';
    imgWrap.appendChild(img);

    var url = 'img/test/{{img}}.jpg';
    var num = Math.round(Math.random() * (number - 1) + 1);

    parent.appendChild(imgWrap);
    url = url.replace('{{img}}', formatImageNumber(num));

    img.src = url;

    return imgWrap;
}


/**
 * CSS class depending on action
 * @param action
 * @returns {string}
 */
function getImageClass(action) {
    return '__' + action.toLowerCase();
}


/**
 * DOM element current image
 * @returns {*|Node|Collection|V|Mixed}
 */
function getCurrentImage() {
    return utils.find('.js-image.__current');
}


/**
 * DOM element next image
 * @returns {*|Node|Collection|V|Mixed}
 */
function getNextImage() {
    return utils.find('.js-image.__next');
}


module.exports = {
    addImage: addImage,
    getImageClass: getImageClass,
    getNextImage: getNextImage,
    getCurrentImage: getCurrentImage
};
