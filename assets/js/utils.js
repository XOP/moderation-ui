/**
 * Utils
 *
 */


/**
 * Returns first element that matches CSS selector {expr}.
 * Querying can optionally be restricted to {container}’s descendants
 *
 * @param expr
 * @param container
 * @returns {Node}
 */
export function find(expr, container) {
    return typeof expr === 'string' ? (container || document).querySelector(expr) : expr || null;
}


/**
 * Returns all elements that match CSS selector {expr} as an array.
 * Querying can optionally be restricted to {container}’s descendants
 *
 * @param expr
 * @param container
 * @returns {*|Array}
 */
export function findAll(expr, container) {
    return [].slice.call((container || document).querySelectorAll(expr));
}
