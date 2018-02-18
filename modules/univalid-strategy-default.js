'use strict';

const UnivalidStrategy = require('./univalid-strategy');

class UnivalidStrategyDefault extends UnivalidStrategy {
    constructor(opt){
        super();

		this.passConfig = opt.passConfig || {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};
    }


    check(pack, core){
        for(let i = 0; i < pack.length; i++){
            core.validate(pack[i]);
        }
    }

    getValidationHandlers(){
        return this.validHandlers;
    }
}

module.exports = UnivalidStrategyDefault;
