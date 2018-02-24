'use strict';

const UnivalidStrategy = require('./univalid-strategy');

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

function _collectPackage(nodes){
	let packageValidation = [];
	let mapFields = {};

	if(nodes && nodes.length){
		for(let i = 0; i < nodes.length; i++){
			let elem = nodes[i];
			let tagname = elem.tagName,
				inputType = elem.type,
				name = elem.getAttribute('name');

			if(name){
				if(mapFields[name]){
					if(inputType !== 'radio'){
						console.warn(new Error(`The field ${name} is dublicate`));
					}
					continue;
				}

				mapFields[name] = true;

				let type = elem.hasAttribute('data-validation') ?
						elem.getAttribute('data-validation') === '' ?
						 	'required' : elem.getAttribute('data-validation')
						: undefined,
					filter = elem.getAttribute('data-f'),
					msg = elem.getAttribute('data-msg');

				if(typeof type === 'undefined')
					continue;

				if(msg){
					try{
						msg = JSON.parse(msg);
					}catch(e){
						throw new Error(`Not valid json structure in data-msg of ${name} field`);
					}
				}

				if(typeof type === 'undefined')
					continue;

				let item = {name, type, val: getValue(elem, name, tagname, inputType)};

				if(filter)
					item.filter = filter;
				if(msg)
					item.msg = msg;

				packageValidation.push(item);
			}

		}

		return packageValidation;
	}

	function getValue(elem, name, tagname, inputType){
		if(tagname === 'SELECT'){
			let options = elem.options,
				selected = options[elem.selectedIndex];

			if(options[0].disabled && selected.value === options[0].value){
				return '';
			}

			return selected.value;
		}

		if(inputType === 'radio'){
			let groupRadio = document.querySelectorAll(`[name="${name}"]`);
			for(let i = 0; i < groupRadio.length; i++){
				if(groupRadio[i].checked){
					return groupRadio[i].value;
				}
				if(i === groupRadio.length - 1){
					return '';
				}
			}
		}

		return elem.value;
	}
}

module.exports = (opt) => {
	let _controller = {
		submit(){
			this.$form.on('submit', e => {
				e.preventDefault();
				this.check(_collectNodes(this.$form));
			})
		},
		blur(){

		},
		focus(){

		},
		keyup(){

		},
		keypress(){

		},
		keydown(){

		}
	};

	class UnivalidStrategyForm extends UnivalidStrategy {
	    constructor(opt){
	        super();

			if(opt){
				this.passConfig = opt.passConfig || {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};

				this.$form = _checkSelector(_checkOption('$form', opt.$form, 'string'), true);
				this.$fields = this.$form && _collectNodes(this.$form);

				this.controller();
			}
	    }

	    check(pack, core){
			let packageValidation = _collectPackage(pack);

			for(let i = 0; i < packageValidation.length; i++){
				core.validate(packageValidation[i]);
			}
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

		controller(){
			for(let e in _controller){
				_controller[e].call(this);
			}
		}
	}

	return new UnivalidStrategyForm(opt);
};
