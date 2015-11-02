/**
 * Application
 *
 */

var utils = require('utils')();

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
function growl(e){
    e.preventDefault();


    console.info(this.dataset.info);
}