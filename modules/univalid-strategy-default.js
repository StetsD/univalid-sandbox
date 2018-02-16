'use strict';

const UnivalidStrategy = require('./univalid-strategy');

const validHandlers = {
    'somecase': () => {

    }
};

class UnivalidStrategyDefault extends UnivalidStrategy {
    constructor(opt){
        super();
    }


    check(pack, core){
        for(let i = 0; i < pack.length; i++){
            if(!pack[i].name)
                return core.emit('error', 'Can\'t find "name" field, "name" is required field')
            if(!pack[i].type)
                return core.emit('error', `Can't find "type" field in ${pack[i].name}, "type" is required field`);

            core.validate(pack[i]);
        }
    }

    getValidationHandlers(){
        return validHandlers;
    }
}

module.exports = UnivalidStrategyDefault;
