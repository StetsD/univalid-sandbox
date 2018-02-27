var assert = require('assert');
let {passScore, setScorePassword, passAccept} = require('../modules/tools/pass-power');

describe('Pass-Score', function() {

    describe('Pass-Score API', function() {

		it('"passScore" method return correct object', function(){
			let result = passScore('987654321Qq', 5, ['hasUppercase', 'hasLowercase', 'hasDigits']);

			assert(
				result.length
				&& result.analysis
				&& result.power
				&& result.analysis.hasUppercase
				&& result.analysis.hasLowercase
				&& result.analysis.hasDigits
			);
		});

		it('"setScorePassword" return normal power of password', function(){
			assert(setScorePassword('987654321Qq', { hasUppercase: true, hasLowercase: false, hasDigits: true }, 11) === 65);
		});

		it('"passAccept" return correct validation with length "0"', function(){
			assert(passAccept({
				length: 0,
  				analysis: { hasUppercase: true, hasLowercase: true, hasDigits: true },
  				power: 777 }) === false
			)
		});

		it('"passAccept" return correct validation with bad analysis', function(){
			assert(passAccept({
				length: 8,
  				analysis: { hasUppercase: true, hasLowercase: false, hasDigits: true },
  				power: 777 }) === false
			)
		});
    });
});
