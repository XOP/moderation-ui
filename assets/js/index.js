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
import * as config from 'config';
import * as post from 'post';


const container = scene.getContainer();
let totalImages = 0;

const labelCurrent = utils.find('.js-label-current');
const labelTotal = utils.find('.js-label-total');
const labelClaims = utils.find('.js-label-claims');

const controlYes = utils.find('.js-control_yes');
const controlNo = utils.find('.js-control_no');
const controlSkip = utils.find('.js-control_skip');


//
// scene setup

// add current image
scene.addImage('__current', updateImageData);

// add next image
scene.addImage('__next');

// images total number
post.getData().then(function(obj) {
    let data = obj;

    totalImages = parseInt(data.total, 10);
    labelTotal.innerText = totalImages;
});


//
// controls binding

// mouse events
controlYes.addEventListener('click', processNextImage);
controlNo.addEventListener('click', processNextImage);
controlSkip.addEventListener('click', processNextImage);

// keyboard events
document.addEventListener('keyup', processNextImage);

// touch events
const hammer = new Hammer(container);

if (config.IS_TOUCH) {
    hammer.get('pan').set({
        threshold: config.PAN_THRESHOLD,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.get('swipe').set({
        velocity: config.SWIPE_VELOCITY,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on(config.TOUCH_EVENTS.join(' '), processNextImage);
}


/**
 * Manage next image
 * @param evt
 */
function processNextImage(evt) {
    // stop handlers
    hammer.stop();
    document.removeEventListener('keyup', processNextImage);

    // resolve action type
    let action;

    if (evt.type === 'click') {
        action = controls.resolveAction(evt.target);
    } else if (evt.type === 'keyup') {
        action = controls.resolveKeypress(evt);
    } else if (~config.TOUCH_EVENTS.indexOf(evt.type)) {
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
        scene.addImage('__next');

        // enable controls
        document.addEventListener('keyup', processNextImage);

        // release button block
        controls.enable();
    }, config.ANIMATION_TIME);
}


/**
 * Update image data
 * @param image
 */
function updateImageData(image) {
    let img = image || this;
    let currentNumber = scene.getNumber(img.dataset.number);

    // update image claims value
    labelClaims.innerText = scene.getClaims(img.dataset.claims);

    // check image number and reset if needed
    if (parseInt(currentNumber, 10) === totalImages) {
        scene.resetImageNumber();
    }

    // update scene counter
    labelCurrent.innerText = currentNumber;
}
