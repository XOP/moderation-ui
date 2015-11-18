/**
 * Config
 *
 */


let _cfg = false;
let _demo = true;
let _url = '';

try {
    _cfg = require('config.json');
    _demo = false;
    _url = _cfg.url;
} catch (err) {
    console.info(err + ' no config.json provided, OPERATING IN DEMO MODE');
}

export const DEMO = _demo;
export const URL = _url;

//
// DEMO mode values
export const IMAGES_COLLECTION = 3;
export const CLAIMS_MAX = 20;
export const POST_SEED = 1000000;

//
// DEV helpers
export const STUB_SRC = 'img/test/01.jpg';
export const DEBUG = true;


//
// CSS relevant constants
export const ANIMATION_TIME = 300;

//
// Hammer settings
export const IS_TOUCH = Modernizr.touchevents;
export const PAN_THRESHOLD = 90;
export const SWIPE_VELOCITY = 0.85;
export const TOUCH_EVENTS = [
    'swipeleft',
    'swiperight',
    'swipeup',
    'panleft',
    'panright',
    'panup'
];
