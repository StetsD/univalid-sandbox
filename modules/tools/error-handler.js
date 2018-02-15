'use strict';

function notEmpty(val, msg){
    if(!val){
        throw new Error(msg);
    }

    return true;
}

function isObject(val, msg){
    if(typeof val !== 'object' || Array.isArray(val))
        throw new TypeError(msg);

    return true;
}

module.exports = {notEmpty, isObject};
