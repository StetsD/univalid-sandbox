module.exports = {
    unipack: [
        {
            name: 'username',
            val: 'Uriy',
            type: 'required',
            filter: 'oL',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Validation error',
                filter: 'Filter error',
                success: 'All right'
            }
        },
        {
            name: 'email',
            val: 'Uriy@mazafaka.com',
            type: 'email',
            filter: /[a-z]|\s/gi,
            msg: {
                empty: 'You shall not pass',
                invalid: 'Bad email',
                filter: 'Only lat/numbers/specials symbols',
                success: 'All right'
            }
        },
        {
            name: 'password',
            val: '987654321Qq#',
            type: 'password',
        	filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Your pass is sucks',
                filter: 'Only lat/numbers/specials symbols',
                success: 'You norm'
            }
        },
        {
            name: 'password2',
            val: '987654321Qq#',
            type: 'equal',
            filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Your passs not qual',
                filter: 'Only lat/numbers/specials symbols',
                success: 'Oooooo normas'
            }
        },
        {
            name: 'wtfak',
            val: 'wtfak and more',
            type: 'wtfType',
            filter: '',
            msg: {
                empty: 'You shall not pass',
                invalid: 'Your passs not qual',
                filter: 'Only lat/numbers/specials symbols',
                success: 'Oooooo normas'
            }
        },
    ]
}
