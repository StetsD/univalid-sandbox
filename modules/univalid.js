'use strict';

const {EventEmitter} = require('events');
const {notEmpty, isObject} = require('./tools/error-handler');
let _strategy = null;

let commonHandlers = {
    'required': () => {

    },
    'email': () => {

    },
    'password': () => {

    },
    'equal': () => {

    }
}

class Univalid extends EventEmitter {
    constructor(strategy){
        super();

        this.setStrategy(strategy);
        this.regValidHandler(commonHandlers);
    }

    setStrategy(strategy){
        notEmpty(strategy, 'Strategy of validation is not defined');
        isObject(strategy, 'Strategy must be an object');

        _strategy = strategy;

        return this;
    }

    // normalize(){
    //
    // }

    check(pack){
        this.emit('start:valid', this);
        _strategy.check(pack, this);
        this.emit('end:valid', this);
        return this;
    }

    validate(name, val, type){
        let valid, status;

        this.emit('start:valid:field', {name, val, type});

        switch(type){
            case 'required' || "" :
            {
                let data = val ? ('' + val).trim() : '';
                decision(!!data, true);
            }
            case ''
        }

        decision(val, condition){
            if(val === 'keyError'){
                valid = 'error';
                status = condition;
            }
            if(val){
                if(condition){
                    valid = 'success';
                    status = 'success';
                }else{
                    valid = 'error';
                    status = 'invalid';
                }
            }else{
                valid = 'error';
                status = 'empty';
            }
        }

        this.emit('end:valid:field', {name, val, type, status, type});

        // return this;
    }

    regValidHandler(pack){

    }

    getState(){

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
