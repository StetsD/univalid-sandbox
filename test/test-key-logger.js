var assert = require('assert');
let keyLogger = require('../modules/tools/filter-handler')();

describe('Key-Logger', function() {

    describe('Key-Logger API', function() {

		describe('Key-Logger has required methods and props', function(){
			it('"test" method is ok', function(){
				assert(keyLogger.test);
			});

			it('"applyFilter" method is ok', function(){
				assert(keyLogger.applyFilter);
			});

			it('"logXss" method is ok', function(){
				assert(keyLogger.logXss);
			});

			it('"onFilter" method is ok', function(){
				assert(keyLogger.onFilter);
			});

			it('"config" prop is ok', function(){
				assert(keyLogger.config);
			});

			it('"specials" prop is ok', function(){
				assert(keyLogger.specials);
			});

			it('"innerTmp" prop is ok', function(){
				assert(keyLogger.innerTmp);
			});
		});

		it('"test" methods works correct', function(){
			assert(keyLogger.test('test@gmail.ru', 'email'));
		});

		it('"applyFilter" methods works correct', function(){
			assert(keyLogger.applyFilter('oL', '654') === false);
		});

		it('"logXss" methods works correct', function(){
			assert(keyLogger.logXss('</sdfsdf/>') === false);
		});

		it('"onFilter" methods works correct', function(){
			assert(keyLogger.onFilter({key: '3'}, 'oL') === true);
		});
    });
});
