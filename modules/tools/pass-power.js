'use strict';

//Config
const _config = {
	inputTemplate: {
		hasUppercase: /[A-Z]/,
		hasLowercase: /[a-z]/,
		hasDigits: /[0-9]/,
		hasSpecials: /[_\W]/,
		hasCyrilic: /[а-яё]/i
	}
};

function passScore(val, minPassLength, analysis = ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials']){
	let power = 0,
		result = {};
		
	result.length = (val.length < minPassLength) ? 0 : val.length;

    result.analysis = {};

    analysis.forEach(elem => {
		if(_config.inputTemplate[elem]){
            result.analysis[elem] = _config.inputTemplate[elem].test(val);
		}
	});

	power = setScorePassword(val, result.analysis, result.length);
	result.power = power;

	return result;
}

function setScorePassword(password, analyse, length){
	let score = 0,
		variationCount = 0,
		letters = {},
		i = 0;

	if(!password){
		return score;
	}

	for(i; i < length; i++){
		letters[password[i]] = (letters[password[i]] || 0) + 1;

		score += 5.0 / letters[password[i]];
	}

	for(var check in analyse){
		variationCount += analyse[check] ? 1 : 0;
	}
	score += (variationCount - 1) * 10;

	return parseInt(score);
}

function passAccept(passScore){
	for (let key in passScore.analysis) {
		if (!passScore.analysis[key]) {
			return false;
		}
	}
	if (!passScore.length) {
		return false;
	}

	return true;
}

module.exports = {passScore, setScorePassword, passAccept}
