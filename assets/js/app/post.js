/**
 * Post
 *
 */


// init preloading scripts
import 'whatwg-fetch';

import * as config from '../config';


/**
 * Format index with leading zero
 * @param n
 * @returns {*}
 */
function _formatImageNumber(n) {
    return n > 9 ? n : '0' + n;
}


/**
 * Demo url string
 * @returns {*}
 */
function _genUrl() {
    let num = Math.round(Math.random() * (config.IMAGES_COLLECTION - 1) + 1);
    let imgNumber = _formatImageNumber(num);

    return `img/test/${imgNumber}.jpg`;
}


/**
 * Demo claims value
 * @returns {number}
 * @private
 */
function _genClaims() {
    return Math.round(Math.random() * config.CLAIMS_MAX);
}


/**
 * Demo total number
 * @private
 */
function _genTotal() {
    return config.IMAGES_COLLECTION;
}


/**
 * Demo post id number
 * @returns {number}
 * @private
 */
function _genPostId() {
    return Math.round(Math.random() * config.POST_SEED);
}


/**
 * Demo data
 * @returns {Promise}
 * @private
 */
function _genData() {
    return new Promise(function(resolve) {
        resolve({
            total: _genTotal(),
            post: {
                postId: _genPostId(),
                complaints: _genClaims()
            },
            url: _genUrl()
        });
    });
}


/**
 * Prod data
 * @returns {*}
 * @private
 */
function _getData() {
    return fetch(config.URL)
        .then(function(res) {
            return res.json();
        });
}


/**
 * Retrieve image JSON data
 * @returns {*}
 */
export function getData() {
    let data;

    if (config.DEMO) {
        data = _genData();
    } else {
        data = _getData();
    }

    return data;
}
