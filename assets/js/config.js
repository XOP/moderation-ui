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
    console.info(err + ' no config.json provided, DEMO MODE ON');
}

export const DEMO = _demo;
export const URL = _url;


export const IMAGES_COLLECTION = 3;
export const CLAIMS_MAX = 20;
export const POST_SEED = 1000000;

export const ANIMATION_TIME = 300;
export const IS_TOUCH = Modernizr.touchevents;
export const PAN_THRESHOLD = 50;
export const SWIPE_VELOCITY = 0.35;
export const TOUCH_EVENTS = [
    'swipeleft',
    'swiperight',
    'swipeup',
    'panleft',
    'panright',
    'panup'
];
