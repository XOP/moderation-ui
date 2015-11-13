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
const PAN_THRESHOLD = 50;
const SWIPE_VELOCITY = 0.35;
const TOUCH_EVENTS = [
    'swipeleft',
    'swiperight',
    'swipeup',
    'panleft',
    'panright',
    'panup'
];

const container = utils.find('.js-scene');

const labelCurrent = utils.find('.js-label-current');
const labelClaims = utils.find('.js-label-claims');

const controlYes = utils.find('.js-control_yes');
const controlNo = utils.find('.js-control_no');
const controlSkip = utils.find('.js-control_skip');


//
// scene setup

// add current image
let currentImage = scene.addImage(container, '__current');

updateImageData(currentImage);

// add next image
scene.addImage(container, '__next');


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

if(IS_TOUCH) {
    hammer.get('pan').set({
        threshold: PAN_THRESHOLD,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.get('swipe').set({
        velocity: SWIPE_VELOCITY,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on(TOUCH_EVENTS.join(' '), processNextImage);
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

    if(evt.type === 'click') {
        action = controls.resolveAction(evt.target);
    } else if(evt.type === 'keyup') {
        action = controls.resolveKeypress(evt);
    } else if(~TOUCH_EVENTS.indexOf(evt.type)) {
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

        // enable controls
        document.addEventListener('keyup', processNextImage);

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
