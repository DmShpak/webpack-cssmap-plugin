"use strict"

const data = {};

module.exports = {
    add(name, value) {
        data[name] = value;
    },
    get() {
        return data;
    },
    reset() {
        data = {};
    }
};
