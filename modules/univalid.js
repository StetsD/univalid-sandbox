 const {EventEmitter} = require('events');

class Univalid extends EventEmitter {
    constructor(opt){
        super();
    }

    regStrategy(strategy){
        

        return this;
    }

    validate(){

        return this;
    }

    init(){
        return this;
    }
}

module.exports = (opt) => {
    return new Univalid(opt);
};
