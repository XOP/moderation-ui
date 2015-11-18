/**
 * Post
 *
 */


// init preloading scripts
import 'whatwg-fetch';

import * as utils from 'utils';
import * as scene from 'scene';
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
function _getData(params) {
    let url = config.URL;

    if (params) {
        let query = utils.serialize(params);

        url = url + '?' + query;

        if (config.DEBUG) {
            console.log('QUERY: ' + query);
        }
    }

    return fetch(url, {
        credentials: 'include' // sending cookies in the CORS request
    })
        .then(function(res) {
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                let err = new Error(res.statusText);

                err.response = res;
                throw err;
            }
        })
        .then(function(res) {
            return res.json();
        })
        .catch(function(err) {
            scene.showError('Data request error:\n' + err);
            return false;
        });
}


/**
 * Retrieve image JSON data
 * @returns {*}
 */
export function getData(params) {
    let data;

    if (config.DEMO) {
        data = _genData();
    } else {
        data = _getData(params);
    }

    return data;
}
