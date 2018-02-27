'use strict';

const UnivalidStrategy = require('./univalid-strategy');

class UnivalidStrategyDefault extends UnivalidStrategy {
    constructor(opt){
        super();

		if(opt){
			this.passConfig = opt.passConfig || {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};
		}
    }

    check(pack, core){
		if(pack && core){
			for(let i = 0; i < pack.length; i++){
	            core.validate(pack[i]);
	        }
		}
    }

    getValidationHandlers(){
        return this.validHandlers;
    }

	set(option, val){
		this[option] = val;
	}

	get(val){
		console.warn(new Error('Getter of default strategy is locked'));
		return null;
	}
}

module.exports = UnivalidStrategyDefault;
