var assert = require('assert');
let UnivalidStrategy = require('../modules/univalid-strategy');
let univalidStrategy = new UnivalidStrategy();

describe('Univalid-Strategy', function() {

    describe('Univalid-Strategy API', function() {

		it('Test plug "check" method', function(){
			assert.throws(() => univalidStrategy.check(), Error);
		});

		it('Test plug "get" method', function(){
			assert.throws(() => univalidStrategy.get(), Error);
		});

		it('Test plug "set" method', function(){
			assert.throws(() => univalidStrategy.set(), Error);
		});

		it('Test plug "getValidationHandlers" method', function(){
			assert.throws(() => univalidStrategy.getValidationHandlers(), Error);
		});

		it('"applyFilter" method correct validation bad symbols', function(){
			assert(univalidStrategy.applyFilter('oL', '777') === false);
		});

		it('"applyFilter" method correct validation allowed symbols', function(){
			assert(univalidStrategy.applyFilter('oL', 'test'));
		});

		it('"applyFilter" method correct validation with custom filter', function(){
			assert(univalidStrategy.applyFilter(() => {return true}, 'test'));
		});

		it('Univalid-Strategy has default "passConfig"', function(){
			assert(univalidStrategy.passConfig);
		});

		describe('Univalid-Strategy has base validation handlers', function(){
			it('"required" validation handler is ok', function(){
				assert(univalidStrategy.validHandlers.required);
			});

			it('"email" validation handler is ok', function(){
				assert(univalidStrategy.validHandlers.email);
			});

			it('"password" validation handler is ok', function(){
				assert(univalidStrategy.validHandlers.password);
			});

			it('"equal" validation handler is ok', function(){
				assert(univalidStrategy.validHandlers.equal);
			});
		})

    });
});
