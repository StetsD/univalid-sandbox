function decision(val, condition){
    let state, status;

    if(val){
        if(condition){
            state = 'success';
            status = 'success';
        }else{
            state = 'error';
            status = 'invalid';
        }
    }else{
        state = 'error';
        status = 'empty';
    }

    return {state, status};
}

module.exports = decision;
