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
		// successStatus: true
	},

	clsConfig: {
		error: 'error',
		success: 'success'
	},

	sendConfig: {
		type: 'get',
		url: '/form',
		notDisableSubmit: true
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
	}
}));
univalid.get('send');
univalid.get('addEvent', {maza(){document.addEventListener('click', ()=>{
	univalid.get('clsConfig');
})}})

univalid.set('core', univalid);


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
		val: '98Dd',
		type: 'password'
	}
])
console.log(univalid2.getState);
