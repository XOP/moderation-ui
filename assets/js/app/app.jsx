/**
 * Main application
 *
 */

var utils = require('utils');

module.exports = function(){

    var mainContainer = utils.find('.js-main-cont');
    React.render(
        <div>
            <strong>Hello from React</strong>
        </div>,
        mainContainer
    );

};