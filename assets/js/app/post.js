/**
 * Post
 *
 */


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
 * Demo data object
 * @returns {{total, post: {postId: number, complaints: number}, url: *}}
 * @private
 */
function _genData() {
    return {
        total: _genTotal(),
        post: {
            postId: _genPostId(),
            complaints: _genClaims()
        },
        url: _genUrl()
    };
}


function _getData() {
    if (Modernizr.fetch) {
        console.log('supports fetch');
    } else {
        console.log('no fetch');
    }
}


export function getData() {
    let data;

    if (config.DEMO) {
        data = _genData();
    } else {
        data = _getData();
    }

    return data;
}
