'use strict';

const UnivalidStrategy = require('./univalid-strategy');
const {notEmpty, isObject, notZeroLength} = require('./tools/error-handler');

const validHandlers = {
    'somecase': () => {

    }
};

class UnivalidStrategyDefault extends UnivalidStrategy {
    constructor(opt){
        super();
    }


    check(pack, core){
        core.validate();
    }

    getValidationHandlers(){
        return validHandlers;
    }
}

module.exports = UnivalidStrategyDefault;
