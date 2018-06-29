'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyForm = require('./modules/univalid-strategy-form');

const univalid = Univalid();
univalid.setStrategy(UnivalidStrategyForm({
	core: univalid,
	$form: '.js-reg-form',

	statusConfig: {
		targetParent: '.form-group',
		targetStatus: '.form__msg',
		// successStatus: true,
	},

	clsConfig: {
		error: 'error',
		success: 'success'
	},

	sendConfig: {
		type: 'get',
		url: '/data/res.json',
		notDisableSubmit: true,
		cbSendSuccess: (res, form) => {
			form.setStatuses(res.data);
		},
		cbSendError: (err, form) => {
			console.log(err.response, form);
		}
	},

	keyLogger: true,

	checkPassScore: {
		target: 'input[type="password"]',
		cb: val => {
			console.log(val);
		}
	},

	passConfig: {
		min: 10,
		analysis: ['hasUppercase']
	},


}));
univalid.get('send');
univalid.get('addEvent', {maza(){document.addEventListener('click', ()=>{
	univalid.get('clsConfig');
})}})

// univalid.setValidHandler({
// 	'mmm': val => {
// 		if(val.match(/reg:mmm:.$/)){
// 			return true;
// 		}else{
// 			return false;
// 		}
// 	}
// })

univalid.set('core', univalid);
univalid.setMsgConfig({filter: "ERROR"});
univalid.toggleDefaultMsgConfig();

const {unipack} = require('./modules/data');
const univalid2 = Univalid();
univalid2.setValidHandler({
	'lol': val => {
		console.log(val, 'Valid');
		return true;
	}
});
univalid2.set('passConfig', {min: 4, analysis: ['hasUppercase']});
univalid2.setMsgConfig({empty: 'NEW EMPTY ERROR', invalid: 'NEW INVALID', filter: "NEW FILTER", success: 'SUCCESS NEWNEW'})
univalid2.check([
	{
		name: 'username',
		val: 'Uriy',
		type: 'lol',
		filter: val => {
			console.log('Filter', val);
			return true;
		},
		msg: {
			empty: 'You shall not pass',
			invalid: 'Validation error',
			filter: 'Filter error',
			success: 'All right'
		}
	},
	{
		name: 'password',
		val: undefined,
		type: 'required',
		filter: 'oC'
	}
])
univalid2.setDefaultMsgConfig({empty: 'Ошибка'});
console.log(univalid2.getState);
