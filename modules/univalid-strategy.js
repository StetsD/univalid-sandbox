'use strict';

class UnivalidStrategy {
    check(){
        throw new Error('The "check" method must be defined in to the strategy of validation');
    }
}


module.exports = UnivalidStrategy;
