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

function isArray(val, msg){
    if(!Array.isArray(val))
        throw new TypeError(msg);

    return true;
}

function notZeroLength(val, msg){
    if(Object.keys(val).length === 0)
        throw new Error(msg);

    return true;
}

function isFunc(val, msg){
    if(typeof val !== 'function')
        throw TypeError(msg);

    return true;
}

module.exports = {notEmpty, isObject, notZeroLength, isArray};
