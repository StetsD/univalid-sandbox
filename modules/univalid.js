'use strict';

const {EventEmitter} = require('events');
const {notEmpty, isObject, notZeroLength} = require('./tools/error-handler');
let _strategy = null;

let _validationHandlers = {
    'required': (val) => {
        let data = val ? ('' + val).trim() : '';
        return data;
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
    }

    setStrategy(strategy){
        notEmpty(strategy, 'Strategy of validation is not defined');
        isObject(strategy, 'Strategy must be an object');

        _strategy = strategy;

        return this;
    }

    check(pack){
        this.emit('start:valid', this);
        _strategy.check(pack, this);
        this.emit('end:valid', this);
        return this;
    }

    validate(name, val, type){
        let valid, status, handler = _validationHandlers[type];

        this.emit('start:valid:field', {name, val, type});

        if(handler){

        }

        // switch(type){
        //     case 'required' || "" :
        //     {
        //
        //         decision(!!data, true);
        //     }
        //
        // }

        // decision(val, condition){
        //     if(val === 'keyError'){
        //         valid = 'error';
        //         status = condition;
        //     }
        //     if(val){
        //         if(condition){
        //             valid = 'success';
        //             status = 'success';
        //         }else{
        //             valid = 'error';
        //             status = 'invalid';
        //         }
        //     }else{
        //         valid = 'error';
        //         status = 'empty';
        //     }
        // }

        this.emit('end:valid:field', {name, val, type, status, type});
    }

    setValidHandler(pack, strictMode){
        notEmpty(pack, 'Pack of validation handlers is not defined');
        isObject(pack, 'Pack of validation handlers must be an object type');
        notZeroLength(pack, 'Pack of validation is empty');

        for(let key in pack){
            if(_validationHandlers[key] && strictMode)
                throw new Error(`Handler of "${key}" type is already exists.If you want overwrite this handler, use 'strictMode' arg = false`);

            _validationHandlers[key] = pack[key];
            this.emit('set:newValidationHandler', key, pack[key]);
        }
    }

    get getValidHandler(){
        return _validationHandlers;
    }

    get getState(){

        return this;
    }

    clearState(){

        return this;
    }

    init(){

        return this;
    }
}

module.exports = (opt) => {
    return new Univalid(opt);
};
