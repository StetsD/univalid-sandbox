'use strict';

const {EventEmitter} = require('events');
const {notEmpty, isObject} = require('./tools/error-handler');
let _strategy = null;



class Univalid extends EventEmitter {
    constructor(strategy){
        super();

        this.setStrategy(strategy);
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
        _strategy.check(pack, this);
        return this;
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
