var assert = require('assert');
let UnivalidStrategy = require('../modules/univalid-strategy');
let univalidStrategy = new UnivalidStrategy();

describe('Univalid-Strategy', function() {

    describe('Univalid-Strategy test api', function() {

		it('Test plug "check" method', function(){
			assert.throws(() => univalidStrategy.check(), Error);
		});
    });
});
