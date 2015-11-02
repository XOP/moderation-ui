module.exports = function(){

    /**
     * Returns first element that matches CSS selector {expr}.
     * Querying can optionally be restricted to {container}’s descendants
     *
     * @param expr
     * @param container
     * @returns {Node}
     */
    function find(expr, container) {
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
    function findAll(expr, container) {
        return [].slice.call((container || document).querySelectorAll(expr));
    }


    return {
        find: find,
        findAll: findAll
    }
};
