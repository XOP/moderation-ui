/**
 * Application
 *
 */

var utils = require('utils')();

//
// images
var images = utils.findAll('.js-image');

images.forEach(function(image, i) {
    var img = new Image();

    image.appendChild(img);
    img.src = 'img/test/' + formatImageNumber(i) + '.jpg';
});

//
// controls
var controlYes = utils.find('.js-control_yes');
var controlNo = utils.find('.js-control_no');
var controlSkip = utils.find('.js-control_skip');

controlYes.addEventListener('click', growl);
controlNo.addEventListener('click', growl);
controlSkip.addEventListener('click', growl);

/**
 * Just say something
 * @param e
 */
function growl(e) {
    e.preventDefault();

    console.info(this.dataset.info);
}

/**
 * Format index with leading zero
 * @param n
 * @returns {*}
 */
function formatImageNumber(n) {
    n = n + 1;
    return n > 9 ? n : '0' + n;
}
