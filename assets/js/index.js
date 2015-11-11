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
const SWIPE_VELOCITY = .25;

let container = utils.find('.js-scene');
let controlYes = utils.find('.js-control_yes');
let controlNo = utils.find('.js-control_no');
let controlSkip = utils.find('.js-control_skip');

let hammer = new Hammer(container);


//
// register touch events
if(IS_TOUCH) {
    hammer.get('swipe').set({
        velocity: SWIPE_VELOCITY,
        direction: Hammer.DIRECTION_ALL
    });
    hammer.on('swipeleft swiperight swipeup', nextImage);
}

//
// scene setup
scene.addImage(container, '__current');
scene.addImage(container, '__next');

//
// controls binding
controlYes.addEventListener('click', nextImage);
controlNo.addEventListener('click', nextImage);
controlSkip.addEventListener('click', nextImage);


function nextImage(evt) {
    let action;

    if(evt.type === 'click') {
        action = controls.resolveAction(evt.target);
    } else {
        action = touch.resolveAction(evt);
    }

    let imageClass = scene.getImageClass(action);
    let currentImage = scene.getCurrentImage();
    let nextImage = scene.getNextImage();

    // block controls
    controls.disable();

    // apply action to current image
    currentImage.classList.add(imageClass);

    // update state of next image
    scene.updateState(nextImage);

    // animation
    setTimeout(function() {
        // remove current image
        currentImage.parentNode.removeChild(currentImage);

        // add next image to scene
        scene.addImage(container, '__next');

        // release button block
        controls.enable();
    }, ANIMATION_TIME);
}
