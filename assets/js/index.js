/**
 * Application
 *
 */

// init modernizr
import 'modernizr-custom';

// utils
import * as utils from 'utils';

// modules
import * as scene from 'scene';
import * as controls from 'controls';

const ANIMATION_TIME = 500;

let container = utils.find('.js-scene');
let controlYes = utils.find('.js-control_yes');
let controlNo = utils.find('.js-control_no');
let controlSkip = utils.find('.js-control_skip');


//
// scene setup
scene.addImage(container, '__current');
scene.addImage(container, '__next');

//
// controls binding
controlYes.addEventListener('click', nextImage);
controlNo.addEventListener('click', nextImage);
controlSkip.addEventListener('click', nextImage);


function nextImage() {
    let action = controls.resolveAction(this);
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
