var assert = require('assert');
let UnivalidStrategy = require('../modules/univalid-strategy-default');
let univalidStrategyDefault = new UnivalidStrategy();

describe('Univalid-Strategy-Default', function() {

    describe('Univalid-Strategy-Default API', function() {

		describe('Has required methods', function(){
			it('"check" method is ok', function(){
				assert(univalidStrategyDefault.check);
			});

			it('"getValidationHandlers" method is ok', function(){
				assert(univalidStrategyDefault.getValidationHandlers);
			});

			it('"set" method is ok', function(){
				assert(univalidStrategyDefault.set);
			});

			it('"get" method is ok', function(){
				assert(univalidStrategyDefault.get);
			});
		})
    });
});
