/**
 * Application
 *
 */

require('modernizr-custom');

var utils = require('utils')();
var scene = require('scene');

var inAction = false;

//
// scene preloading
var container = utils.find('.js-scene');

scene.addImage(container).classList.add('__current');
scene.addImage(container).classList.add('__next');

//
// controls binding
var controlYes = utils.find('.js-control_yes');
var controlNo = utils.find('.js-control_no');
var controlSkip = utils.find('.js-control_skip');

controlYes.addEventListener('click', nextImage);
controlNo.addEventListener('click', nextImage);
controlSkip.addEventListener('click', nextImage);


function nextImage() {
    if(inAction) {
        return false;
    }

    inAction = true;

    var action = resolveAction.call(this);
    var imageClass = scene.getImageClass(action);
    var currentImage = scene.getCurrentImage();
    var nextImage = scene.getNextImage();

    currentImage.classList.add(imageClass);
    setTimeout(function() {
        currentImage.parentNode.removeChild(currentImage);
        nextImage.classList.remove('__next');
        nextImage.classList.add('__current');
        scene.addImage(container).classList.add('__next');
        inAction = false;
    }, 1000);
}

function resolveAction() {
    return this.dataset.info;
}
