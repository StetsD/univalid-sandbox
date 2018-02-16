'use strict';

const {EventEmitter} = require('events');
const { notEmpty,
        isObject,
        notZeroLength,
        isArray } = require('./univalid-tools/univalid-error-handler');
const decision = require('./univalid-tools/univalid-decision');
const MSG_CONFIG = require('./univalid-tools/univalid-msg-config');

let _strategy = null;
var _state = [];
let _validationHandlers = {
    'required': (val) => {
        let data = val ? ('' + val).trim() : '';
        return !!data;
    },
    'email': (val) => {

    },
    'password': (val) => {

    },
    'equal': (val) => {

    }
}

class Univalid extends EventEmitter {
    constructor(strategy){
        super();

        this.setStrategy(strategy);
        this.setValidHandler(strategy.getValidationHandlers(), true);
        this.on('error', msg => {
            console.error(new Error(msg));
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
        pack.length && _strategy.check(pack, this);
        this.emit('end:valid', this);
        return this;
    }

    validate(field){
        let {name, val, type, filter, msg} = field;
        let handler = _validationHandlers[type];

        this.emit('start:valid:field', field);

        if(handler){
            let condition = handler(val);
            var {state, status} = decision(val, condition);
            let msgResult;

            if(msg){

            }
            msgResult = msg[state] || MSG_CONFIG[state];

            _state.push({name, type, state, status, msg: msgResult});
            this.emit('end:valid:field', {name, type, state, status, msg: msgResult});
        }
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

    get getValidHandler(){
        return _validationHandlers;
    }

    get getState(){
        return _state;
    }

    clearState(){
        _state = [];
    }
}

module.exports = (opt) => {
    return new Univalid(opt);
};
