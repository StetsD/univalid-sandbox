'use strict';

const filterHandler = require('./tools/filter-handler')();
const {passScore, passAccept} = require('./tools/pass-power');

class UnivalidStrategy {
	constructor(){
		this.validHandlers = {
			'required': (val) => {
		        let data = val ? ('' + val).trim() : '';
		        return !!data;
		    },
		    'email': (val) => {
				return filterHandler.test(val, 'email');
		    },
		    'password': (val) => {
				let crossCondition = passScore(val, this.passConfig.min, this.passConfig.analysis);
				this.passBuffer = val;
				return passAccept(crossCondition);
		    },
		    'equal': (val) => {
				let crossCondition = this.passBuffer === val;
				this.passBuffer = null;
				return crossCondition;
		    }
		}

		this.passConfig = {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};
	}

    check(){
        throw new Error('The "check" method must be defined in to the strategy of validation');
    }

	applyFilter(filter, val){
		if(filterHandler.innerTmp[filter]){
			return filterHandler.applyFilter(filter, val);
		}

		return true;
	}

    getValidationHandlers(){
        throw new Error('The "getValidationHandlers" method must be defined in to the strategy of validation')
    }

	set(){
		throw new Error('The "set" method must be defined in to the strategy of validation')
	}

	get(){
		throw new Error('The "get" method must be defined in to the strategy of validation')
	}
}


module.exports = UnivalidStrategy;
