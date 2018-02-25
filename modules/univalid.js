'use strict';

const {EventEmitter} = require('events');
const UnivalidStrategyDefault = require('./univalid-strategy-default');

const { notEmpty,
        isObject,
        notZeroLength,
        isArray } = require('./univalid-tools/univalid-error-handler');
const decision = require('./univalid-tools/univalid-decision');
const MSG_CONFIG = require('./univalid-tools/univalid-msg-config')();


module.exports = (opt) => {
	let _strategy = null;
	var _state = [];
	let _validationHandlers = {};

	class Univalid extends EventEmitter {
	    constructor(
			strategy = new UnivalidStrategyDefault({
				passConfig: {
					min: 6,
					analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']
				}
			})
		){
	        super();

	        this.setStrategy(strategy);
	        this.setValidHandler(strategy.getValidationHandlers(), true);
	        this.on('error', msg => {
	            console.warn(new Error(msg));
	        });
	    }

	    setStrategy(strategy){
	        notEmpty(strategy, 'Strategy of validation is not defined');
	        isObject(strategy, 'Strategy must be an object');

	        _strategy = strategy;
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

			this.emit('start:valid:field', field);

			if(!name)
				return this.emit('error', 'Can\'t find "name" field, "name" is required field')
			if(!type)
				return this.emit('error', `Can't find "type" field in ${name}, "type" is required field`);

	        if(handler){
	            let condition = handler(val);
	            var {state, status} = decision(val, condition);
	            var msgResult;

				if(filter && !_strategy.applyFilter(filter, val)){
					state = 'error';
					status = 'filter';
				}

				msg && msg[status] ?
					msgResult = msg[status] :
					msgResult = MSG_CONFIG[status];

	            _state.push({name, type, state, status, msg: msgResult});
	        }

			this.emit('end:valid:field', {name, type, state, status, msg: msgResult});
	    }

	    setValidHandler(pack, strictMode){
	        notEmpty(pack, 'Pack of validation handlers is not defined');
	        isObject(pack, 'Pack of validation handlers must be an object type');

	        if(Object.keys(pack).length !== 0){
	            for(let key in pack){
	                if(_validationHandlers[key] && strictMode)
	                    throw new Error(`Handler of "${key}" type is already exists.If you want overwrite this handler, use 'strictMode' arg = false`);

	                _validationHandlers[key] = pack[key];
	                this.emit('set:newValidationHandler', key, pack[key]);
	            }
	        }else{
	            console.warn('Pack of validation is empty');
	        }
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
		}

		get getValidHandler(){
	        return _validationHandlers;
	    }

	    get getState(){
	        return _state;
	    }

		get getCommonState(){
			if(_state.length){
				for(let i = 0; i < _state.length; i++){
					if(_state[i].state === 'error')
						return 'error';
				}

				return 'success';
			}
		}
	}

    return new Univalid(opt);
};
