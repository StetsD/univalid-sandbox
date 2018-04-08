'use strict';

//add new schema

const {EventEmitter} = require('events');
const UnivalidStrategyDefault = require('./univalid-strategy-default');

const { notEmpty,
        isObject,
        notZeroLength,
        isArray } = require('./univalid-tools/univalid-error-handler');
const decision = require('./univalid-tools/univalid-decision');
const MSG_CONFIG = require('./univalid-tools/univalid-msg-config')();


module.exports = () => {
	let _strategy = null;
	var _state = [];
	let _validationHandlers = {};
	let _msgConfig = Object.assign({}, MSG_CONFIG);

	class Univalid extends EventEmitter {
	    constructor(){
	        super();

	        this.on('error', msg => {
	            console.warn(new Error(msg));
	        });

			this.DEFAULT_MSG_CONFIG = false;

			this.setStrategy(new UnivalidStrategyDefault());
			return this;
	    }

	    check(pack){
	        isArray(pack, 'Entry validation package must be an array type');

	        this.emit('start:valid', this);
			this.clearState();
	        pack.length && _strategy.check(pack, this);
	        this.emit('end:valid', this);
	        return this;
	    }

	    validate(field){
	        let {name, val, type, filter, msg} = field;
	        let handler = _validationHandlers[type];

			if(!name)
				return this.emit('error', 'Can\'t find "name" field, "name" is required field')
			if(!type)
				return this.emit('error', `Can't find "type" field in ${name}, "type" is required field`);

	        if(handler){
				this.emit('start:valid:field', field);

				if(type !== 'required'){
					var byPassCondition = _validationHandlers['required'](val);
					var {state, status} = decision(val, byPassCondition);
				}

				if(byPassCondition !== false){
					let condition = handler(val);
		            var {state, status} = decision(val, condition);
		            var msgResult;

					if(filter && !_strategy.applyFilter(filter, val)){
						state = 'error';
						status = 'filter';
					}
				}

				msg && msg[status] ?
					msgResult = msg[status] :
					msgResult = !this.DEFAULT_MSG_CONFIG ? _msgConfig[status] : MSG_CONFIG[status];

	            _state.push({name, type, state, status, msg: msgResult});
				this.emit('end:valid:field', {name, type, state, status, msg: msgResult});
	        }
	    }

		setStrategy(strategy){
	        notEmpty(strategy, 'Strategy of validation is not defined');
	        isObject(strategy, 'Strategy must be an object');

	        _strategy = strategy;
			this.setValidHandler(strategy.getValidationHandlers());
			this.emit('change:strategy', this);
	        return this;
	    }

	    setValidHandler(pack){
	        notEmpty(pack, 'Pack of validation handlers is not defined');
	        isObject(pack, 'Pack of validation handlers must be an object type');

	        if(Object.keys(pack).length !== 0){
	            for(let key in pack){
	                _validationHandlers[key] = pack[key];
	                this.emit('set:new-ValidationHandler', key, pack[key]);
	            }
	        }else{
	            this.emit('error', 'Pack of validation is empty');
	        }
	    }

		setMsgConfig(config){
			if(!config){
				return this.emit('error', 'msgConfig of validation handlers is not defined');
			}

			for(let key in config){
				if(_msgConfig[key]){
					_msgConfig[key] = config[key];
				}
			}

			this.emit('change:msg-config', this);
		}

		set(option, val){
			let strOpt = _strategy[option];

			if(!strOpt)
				return this.emit('error', `The option "${option}" is not defined in used strategy`);
			if(val){
				let valType = Array.isArray(val) ? 'array' : typeof val,
					strOptType = Array.isArray(strOpt) ? 'array' : typeof strOpt;

				if(valType !== strOptType)
					return this.emit('error', `The value "${val}" of setter has bad type`);

				_strategy.set(option, val);
				this.emit('set:new-prop-strategy', this);
			}
		}

		get(prop, ...args){
			if(!_strategy[prop])
				return this.emit('error', `The property "${prop}" is not defined in used strategy`);

			if(typeof _strategy[prop] === 'function'){
				return _strategy.get(prop).apply(_strategy, args);
			}

			return _strategy.get(prop);
		}

		clearState(){
			_state = [];
			this.emit('clear:state', this);
		}

		get getValidHandler(){
	        return _validationHandlers;
	    }

	    get getState(){
	        return _state;
	    }

		get getStrategy(){
			return _strategy;
		}

		get getCommonState(){
			if(_state.length){
				for(let i = 0; i < _state.length; i++){
					if(_state[i].state === 'error')
						return 'error';
				}

				return 'success';
			}else{
				return null;
			}
		}

		toggleDefaultMsgConfig(){
			this.DEFAULT_MSG_CONFIG = !this.DEFAULT_MSG_CONFIG;
		}

		setDefaultMsgConfig(config){
			if(!config){
				return this.emit('error', 'msgConfig of validation handlers is not defined');
			}

			for(let key in config){
				if(MSG_CONFIG[key]){
					MSG_CONFIG[key] = config[key];
				}
			}
		}
	}

    return new Univalid();
};
