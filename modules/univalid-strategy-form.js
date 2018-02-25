'use strict';

const UnivalidStrategy = require('./univalid-strategy');
const keyLogger = require('./tools/filter-handler')();
const {passScore} = require('./tools/pass-power');
const axios = require('axios');
const serialize = require('form-serialize');

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

function _collectNodes(form, node){
	let nodes = [];

	if(node){
		nodes.push(node);
	}else{
		nodes = [].slice.call(form.querySelectorAll('input, select, textarea'));
	}

	return nodes;
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

			if(!selected)
				return '';

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

		if(inputType === 'checkbox'){
			if(elem.checked)
				return elem.value;

			return '';
		}

		return elem.value;
	}
}

function _setResult(pack, formSt){
	if(!formSt.statusConfig || !formSt.statusConfig.targetParent){
		console.warn(new Error('Nowhere to set errors. Not determined "statusConfig" property in UnivalidStrategyForm.'));
		return;
	}

	var notInputStatus = 0;

	if(pack && pack.length){
		let {targetParent, targetStatus, successStatus} = formSt.statusConfig,
			lastStatus = formSt.core.getCommonState;

		formSt.$form.classList.add(formSt.clsConfig[lastStatus]);

		pack.forEach(elem => {
			let input = document.querySelector(`[name="${elem.name}"]`),
				inputParent = input.closest(targetParent),
				inputStatus = inputParent.querySelector(targetStatus);

			if(elem.state === 'error'){
				injectMsg(input, inputStatus, inputParent, elem);
			}else{
				successStatus && injectMsg(inputStatus, inputParent, elem);
			}
		});

		if(notInputStatus)
			console.warn(`Not find "${targetStatus}" selector in one of more ${targetParent}`);
	}



	function injectMsg(input, statusCont, parent, elem){
		if(statusCont){
			statusCont.innerText = elem.msg;
		}else{
			notInputStatus++;
		}

		parent.classList.add(formSt.clsConfig[elem.state]);
		input.classList.add(formSt.clsConfig[elem.state]);
	}
}

module.exports = (opt) => {
	let _controller = {
		submit(){
			this.$form.addEventListener('submit', e => {
				e.preventDefault();
				this.core.check(_collectNodes(this.$form));

				if(this.core.getCommonState === 'success'){
					this.send();
				}
			}, false);
		},
		blur(){
			if(this.keyLogger){
				let inputs = _collectNodes(this.$form);

				inputs.forEach(input => {
					input.addEventListener('blur', e => {
						var elem = e.target,
							val = elem.value,
							tag = elem.tagName,
							type = elem.type,
							validType = elem.getAttribute('data-f');

						if(val && tag === 'INPUT' && type === 'text'){
							if(keyLogger.logXss(val)){
								this.clearInputs(elem);
							}
							if(validType){
								if(!keyLogger.applyFilter(validType, val)){
									this.core.check(_collectNodes(this.$form, elem));
								}
							}
						}
					});
				});
			}
		},
		focus(){
			_collectNodes(this.$form)
				.forEach(elem => {
					elem.addEventListener('focus', e => {
						this.clearStatuses([e.target]);
					}, false);
				});
		},
		keyup(){
			if(this.keyLogger){
				let inputs = _collectNodes(this.$form);

				inputs.forEach(input => {
					input.addEventListener('keyup', e => {
						let elem = e.target,
							val = elem.value,
							validType = elem.getAttribute('data-f');

						if(!keyLogger.applyFilter(validType, val)){
							this.core.check(_collectNodes(this.$form, elem));
							return false;
						}else{
							this.clearStatuses([e.target]);
						}
					});
				});
			}

			if(this.checkPassScore){
				if(this.checkPassScore.target){
					this.$form.querySelector(this.checkPassScore.target).addEventListener('keyup', e => {
						this.checkPassScore.cb && this.checkPassScore.cb(passScore(e.target.value, this.passConfig.min, this.passConfig.analysis).power);
					});
				}

			}
		}
	};

	class UnivalidStrategyForm extends UnivalidStrategy {
	    constructor(opt){
	        super();

			if(opt){
				if(!opt.core){
					console.warn(new Error("Don't finded the 'core' field during initialized UnivalidStrategyForm. This filed is required. See more to link ..."));
					return;
				}
				if(!opt.$form){
					console.warn(new Error("Don't finded the '$form' field during initialized UnivalidStrategyForm. This filed is required. See more to link ..."));
					return;
				}

				//Required props
				this.core = opt.core || {};
				this.$form = _checkSelector(_checkOption('$form', opt.$form, 'string'), true);
				//Option props
				this.statusConfig = (typeof opt.statusConfig === 'object') ? opt.statusConfig : false;
				this.clsConfig = (typeof opt.clsConfig === 'object') ? opt.clsConfig : {error: 'error', success: 'success'};
				this.passConfig = opt.passConfig || {min: 6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']};
				this.sendConfig = opt.sendConfig;
				this.keyLogger = (typeof opt.keyLogger === 'boolean') ? opt.keyLogger : false;
				this.checkPassScore = (typeof opt.checkPassScore === 'object') ? opt.checkPassScore : false;

				this.controller();
			}else{
				console.warn(new Error("Don't finded the 'core' field during initialized UnivalidStrategyForm. This filed is required. See more to link ..."));
				return;
			}
	    }

		clearStatuses(pack){
			this.$form.classList.remove(`${this.clsConfig.error}`, `${this.clsConfig.success}`);

			if(!this.statusConfig || !this.statusConfig.targetParent){
				console.warn(new Error('Nowhere to set errors. Not determined "statusConfig" property in UnivalidStrategyForm.'));
				return;
			}

			pack.forEach(elem => {
				let parent = elem.closest(this.statusConfig.targetParent),
					statusContainer = parent.querySelector(this.statusConfig.targetStatus);

				parent.classList.remove(this.clsConfig.error, this.clsConfig.success);
				elem.classList.remove(this.clsConfig.error, this.clsConfig.success);

				if(statusContainer){
					statusContainer.innerText = '';
				}
			});
		}

		send({
			newAjaxBody = this.sendConfig,
			cbSendComplete = this.cbSendComplete,
			cbSendSuccess = this.cbSendSuccess,
			cbSendError = this.cbSendError,
		} = {}){
			if(newAjaxBody){
				let type = (newAjaxBody.type === 'method') ? this.$form.getAttribute('method') : newAjaxBody.type,
					url = (newAjaxBody.url === 'action') ? this.$form.getAttribute('action') : newAjaxBody.url,
					data = (!newAjaxBody.data) ? serialize(this.$form, {hash: true}) : newAjaxBody.data,
					notDisableSubmit = newAjaxBody.notDisableSubmit;
				let $submit = this.$form.querySelector('[type="submit"]');

				$submit && !notDisableSubmit ? $submit['disabled'] = true : null;

				if(!type){
					return console.warn(new Error('Http Method is not defined. Define it in attributes "send" method or html attribute of form "method"'));
				}
				if(!url){
					return console.warn(new Error('Url to send is not defined. Define it in attributes "send" method or html attribute of form "action"'));
				}

				axios[type.toLowerCase()](url, data)
					.then(res => {
						$submit && !notDisableSubmit ? $submit['disabled'] = false : null;
						cbSendSuccess && cbSendSuccess(res, this);
					})
					.catch(err => {
						$submit && !notDisableSubmit ? $submit['disabled'] = false : null;
						cbSendError && cbSendError(res, this);
					})
			}
		}

	    check(pack, core){
			let packageValidation = _collectPackage(pack);

			for(let i = 0; i < packageValidation.length; i++){
				core.validate(packageValidation[i]);
			}

			this.clearStatuses(pack);
			_setResult(core.getState, this);
	    }

		clearInputs(inputs){
			if(!inputs){
				this.$form.reset();
			}else{
				if(inputs.length > 1){
					inputs.forEach(elem => caseInput(elem));
				}else{
					caseInput(inputs);
				}
			}

			function caseInput(elem){
				elem = elem.length && elem.tagName !== 'SELECT' ? elem[0] : elem;
				let tag = elem.tagName,
					type = elem.getAttribute('type');

				if(tag == 'INPUT' && type !== 'radio' && type !== 'checkbox'){
					elem.value = '';
				}else if(type == 'radio' || type == 'checkbox'){
					elem['checked'] = false;
				}else if(tag == 'SELECT'){
					if(!elem.multiple){
						elem.options[0]['selected'] = true;
					}else{
						for(let i = 0; i < elem.options.length; i++){
							elem.options[i]['selected'] = false;
						}
					}
				}
			}
		}

		addEvent(events){
			if(events){
				for(var e in events){
					if(_controller[e]){
						console.warn(new Error('This event name is already exist'));
					}else{
						_controller[e] = events[e];
						this.controller(e);
					}
				}
			}
		}

		disable(){
			_collectNodes(this.$form)
				.forEach(elem => {
					elem.disabled = true;
				});
		}

		enable(){
			_collectNodes(this.$form)
				.forEach(elem => {
					elem.disabled = false;
				});
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

		controller(event){
			if(event){
				_controller[event].call(this);
			}else{
				for(let e in _controller){
					_controller[e].call(this);
				}
			}

		}
	}

	return new UnivalidStrategyForm(opt);
};
