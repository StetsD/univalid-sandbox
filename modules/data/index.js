module.exports = {
    unipack: [
        {
            name: 'username',
            val: 'Uriy',
            type: 'required',
            filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Validation error',
                filterErr: 'Filter error',
                // success: 'All right'
            }
        },
        {
            name: 'email',
            val: 'Uriy@mazafaka.com',
            type: 'email',
            filter: '',
            // msg: {
            //     empty: 'You shall not pass',
            //     invalid: 'Bad email',
            //     filterErr: 'Only lat/numbers/specials symbols',
            //     success: 'All right'
            // }
        },
        {
            name: 'password',
            val: '987654321QqWw',
            type: 'password',
            filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Your pass is sucks',
                filterErr: 'Only lat/numbers/specials symbols',
                success: 'You norm'
            }
        },
        {
            name: 'password2',
            val: '987654321QqWw',
            type: 'equal',
            filter: '',
            // msg: {
            //     empty: 'You shall not pass',
            //     invalid: 'Your passs not qual',
            //     filterErr: 'Only lat/numbers/specials symbols',
            //     success: 'Oooooo normas'
            // }
        },
        {
            name: 'wtfak',
            val: 'wtfak and more',
            type: 'wtfType',
            filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Your passs not qual',
                filterErr: 'Only lat/numbers/specials symbols',
                success: 'Oooooo normas'
            }
        },
    ]
}
