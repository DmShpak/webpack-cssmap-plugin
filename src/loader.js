"use strict"

const CssLoaderWithHooks = require("css-loader-with-hooks");
const store = require("./cssmap-store");

const getRecord = (item) => {
    const record = {};
    item.forEach(({ name, value }) => { record[name] = value });
    return record;
};

/**
 * Wrap css-loader-with-hooks and inject onExports hook to store class names
 * information in the store
 */
module.exports = function (...args) {

    const originalOnExports = this.query.onExports;

    this.query.onExports = function (...handlerArgs) {

        originalOnExports && originalOnExports.apply(this, handlerArgs);

        const [item, loaderContext] = handlerArgs;
        store.add(loaderContext.resourcePath, getRecord(item));
    }

    return CssLoaderWithHooks.apply(this, args);
}
