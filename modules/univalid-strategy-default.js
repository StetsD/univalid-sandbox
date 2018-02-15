'use strict';

const UnivalidStrategy = require('./univalid-strategy');

class UnivalidStrategyDefault extends UnivalidStrategy {
    constructor(opt){
        super();
    }


    check(pack, core){
        
    }
}

module.exports = UnivalidStrategyDefault;
