/**
 * Application
 *
 */

// init preloading scripts
import 'modernizr-custom';
import 'hammerjs';

// utils
import * as utils from 'utils';

// modules
import * as scene from 'scene';
import * as controls from 'controls';
import * as touch from 'touch';

const ANIMATION_TIME = 300;
const IS_TOUCH = Modernizr.touchevents;
const PAN_THRESHOLD = 80;

let container = utils.find('.js-scene');

let labelCurrent = utils.find('.js-label-current');
let labelClaims = utils.find('.js-label-claims');

let controlYes = utils.find('.js-control_yes');
let controlNo = utils.find('.js-control_no');
let controlSkip = utils.find('.js-control_skip');

let hammer = new Hammer(container);


//
// register touch events
if(IS_TOUCH) {
    hammer.get('pan').set({
        threshold: PAN_THRESHOLD,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on('panleft panright panup', nextImage);
}

//
// scene setup

// add current image
let currentImage = scene.addImage(container, '__current');
updateImageData(currentImage);

// add next image
scene.addImage(container, '__next');

//
// controls binding
controlYes.addEventListener('click', nextImage);
controlNo.addEventListener('click', nextImage);
controlSkip.addEventListener('click', nextImage);


/**
 * Manage next image
 * @param evt
 */
function nextImage(evt) {
    // resolve action type
    let action;

    if(evt.type === 'click') {
        action = controls.resolveAction(evt.target);
    } else {
        action = touch.resolveAction(evt);
    }

    let imageClass = scene.getImageClass(action);

    // get images
    let currentImage = scene.getCurrentImage();
    let nextImage = scene.getNextImage();

    // block controls
    controls.disable();

    // apply action to current image
    currentImage.classList.add(imageClass);

    // update state of next image
    scene.updateState(nextImage);

    // update image data
    updateImageData(nextImage);

    // animation finally
    setTimeout(function() {
        // remove current image
        currentImage.parentNode.removeChild(currentImage);

        // add next image to scene
        scene.addImage(container, '__next');

        // release button block
        controls.enable();
    }, ANIMATION_TIME);
}


/**
 * Update image data
 * @param image
 */
function updateImageData(image) {
    labelClaims.innerText = scene.getClaims(image.dataset.claims);
    labelCurrent.innerText = scene.getNumber(image.dataset.number);
}