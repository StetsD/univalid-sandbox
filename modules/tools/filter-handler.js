'use strict';

const _config = {
    filters: {
        oC: /[а-яё]|\s/gi,
        oL: /[a-z]|\s/gi,
        oN: /\d+$/g,
		oS: /<\/?[a-z0-9]+>.*/gi,
		oP: /[A-Z]|[0-9]|[+|<|>|"|'|_|=||)|(|*|&|^|%|$|#|@|!|?|:|.|\\|/|;|,|-]/gi,
    },
    tmp: {
        email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    }
}

class FilterHandler {
	constructor(){
		this.config = _config;
		this.specials = {
			'Escape': true,
			'Tab': true,
			'Enter': true,
			'Backspace': true,
			'Spacebar': true,
			'Insert': true,
			'Home': true,
			'PageUp': true,
			'Delete': true,
			'End': true,
			'PageDown': true,
			'ArrowUp': true,
			'ArrowDown': true,
			'ArrowLeft': true,
			'ArrowRight': true,
			'Pause': true,
			'ContextMenu': true,
			'F1': true,
            'F2': true,
            'F3': true,
            'F4': true,
			'F5': true,
			'F6': true,
			'F7': true,
			'F8': true,
			'F9': true,
			'F10': true,
			'F11': true,
			'F12': true,
		};
		this.innerTmp = {
            oC: /[а-яё]/gi,
            oL: /[a-z]/gi,
            oN: /\d/g,
            oP: /[A-Z]|[0-9]|[+|<|>|"|'|_|=||)|(|*|&|^|%|$|#|@|!|?|:|.|\\|/|;|,|-]/gi
        }
	}

	test(val, tmp){
		if(_config.tmp[tmp]){
			return _config.tmp[tmp].test(val);
		}else{
			console.warn(`The "${tmp}" template not found in filter-handler module`);
		}
	}

	applyFilter(filter, val){
		let regs = this.innerTmp,
			filters = [];

		switch(filter){
			case 'oC':
				filters = filters.concat([regs.oL, regs.oN]);
				break;
			case 'oL':
				filters = filters.concat([regs.oC, regs.oN]);
				break;
			case 'oN':
				filters = filters.concat([regs.oC, regs.oL]);
				break;
			case 'oP':
				filters = filters.concat([regs.oC]);
				break;
			default:
				break;
		}

		return _parseReg(val, filters);
	}

	logXss(string){
		if(string.match(this.config.filters.oS)){
			return true;
		}else{
			return false;
		}
	}

	onFilter(e, elem = 'default') {
		let keyCode = e.keyCode,
			symbol = e.key || String.fromCharCode(keyCode);

		if(symbol in this.specials) return;
		if(!symbol.match(this.config.filters[elem])) {
			return true;
		} else {
			return false;
		}
	}
}

let _parseReg = function(string, regs){
	for(let i = 0; i < regs.length; i++){
		if(`${string}`.match(regs[i])){
			return false;
		}
	}
	return true;
};

module.exports = () => {
	return new FilterHandler();
};
