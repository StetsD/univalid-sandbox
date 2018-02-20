'use strict';

const UnivalidStrategy = require('./univalid-strategy');

class UnivalidStrategyForm extends UnivalidStrategy {
    constructor(opt){
        super();

		if(opt){
			this.passConfig = opt.passConfig || {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};

			this.$form = _checkSelector(_checkOption('$form', opt.$form, 'string'), true);
			this.$fields = this.$form && _collectNodes(this.$form);
		}
    }

    check(pack, core){
		if(!Array.isArray(pack)){
			this.collectFields();
		}

		for(let i = 0; i < pack.length; i++){
			core.validate(pack[i]);
		}
    }

	collectFields(){

	}

    getValidationHandlers(){
        return this.validHandlers;
    }

	set(option, val){
		this[option] = val;
	}

	get(val){
		return this[val];
	}
}

function _checkOption(name, opt, type){
	if(!opt){
		console.warn(`The "${name}" option is required`);
		return null;
	}

	if(typeof opt !== type){
		console.warn(`The "${name}" option must has ${type} type`);
		return null;
	}

	return opt;
}

function _checkSelector(slc, unique){
	if(slc){
		var nodeList = document.querySelectorAll(slc);

		if(!nodeList[0]){
			console.warn(`Can't find a "${slc}" selector`);
			return null;
		}

		if(unique && nodeList.length > 1){
			console.warn(`The "${slc}" selector must be unique node`);
			return null;
		}

		return nodeList[0];
	}
}

function _collectNodes(node){
	if(node){
		let nodes = node.querySelectorAll('input, select, textarea');
		return nodes;
	}
}

module.exports = UnivalidStrategyForm;
