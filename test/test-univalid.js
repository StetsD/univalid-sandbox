var assert = require('assert');
let univalid = require('../modules/univalid')();

describe('Univalid', function() {

    describe('Univalid API', function() {

		it('Must have default univalid strategy of validation', function() {
			assert.ok(univalid.getStrategy);
		});

		it('Univalid has set method', function() {
        	assert.ifError(univalid.set('passConfig', {min: 6, analysis: ['hasUppercase']}));
        });

		it('setValidHandler method works ok', function() {
        	assert.ifError(univalid.setValidHandler({
				'superRequred': (val) => {
					return true;
			    },
			}));
        });


		it('validate method works ok', function() {
        	assert.ifError(univalid.validate({
				name: 'username',
				val: 'one',
				type: 'required',
				filter: 'oL'
			}));
        });

		it('check method works ok', function() {
			let univalid = require('../modules/univalid')();

        	assert(univalid.check([
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
		        }
			]));
        });
    });

	describe('Univalid Check Tests', function(){
		it('Validate method returned object with correct fields', function(){
			let univalid = require('../modules/univalid')();

			univalid.validate({
				name: 'username',
				val: 'one',
				type: 'required',
				filter: 'oL'
			});

			let result = univalid.getState[0];
			let {name, type, state, status, msg} = result;

			assert(typeof result === 'object');
			assert(result.name && typeof result.name === 'string');
			assert(result.type && typeof result.type === 'string');
			assert(result.state && typeof result.state === 'string');
			assert(result.status && typeof result.status === 'string');
			assert(result.msg && typeof result.msg === 'string');
		});
	});

});
