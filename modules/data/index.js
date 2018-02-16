module.exports = {
    unipack: [
        {
            name: 'username',
            val: 'Uriy',
            type: 'required',
            filter: '',
            msg: {
                errEmpty: 'You shall not pass',
                errValidation: 'Validation error',
                errFilter: 'Filter error',
                success: 'All right'
            }
        },
        {
            name: 'email',
            val: 'Uriy@mazafaka.com',
            type: 'email',
            filter: '',
            msg: {
                errEmpty: 'You shall not pass',
                errValidation: 'Bad email',
                errFilter: 'Only lat/numbers/specials symbols',
                success: 'All right'
            }
        },
        {
            name: 'password',
            val: '987654321QqWw',
            type: 'password',
            filter: '',
            msg: {
                errEmpty: 'You shall not pass',
                errValidation: 'Your pass is sucks',
                errFilter: 'Only lat/numbers/specials symbols',
                success: 'You norm'
            }
        },
        {
            name: 'password2',
            val: '987654321QqWw',
            type: 'equal',
            filter: '',
            msg: {
                errEmpty: 'You shall not pass',
                errValidation: 'Your passs not qual',
                errFilter: 'Only lat/numbers/specials symbols',
                success: 'Oooooo normas'
            }
        },
    ]
}
