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
		type: 'method',
		url: 'https://e18040a6-40bf-4c1d-a4d1-5273ce7ffd63.mock.pstmn.io/form',
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

univalid.get('addEvent', {maza(){document.addEventListener('click', ()=>{
	console.log('Check new maza event');
})}})

// univalid.set('core', univalid);


const {unipack} = require('./modules/data');
const univalid2 = Univalid();
console.log(univalid2.get('passConfig'))
univalid2.check(unipack)
console.log(univalid2.getState);


// univalid.on('start:valid', uni => {
//     console.log('start', uni);
// });
// univalid.on('end:valid', uni => {
//     console.log('end', uni);
// 	console.log(univalid.getState)
// });

// univalid.on('end:valid:field', field => {
//     console.log(field);
// });

// univalid.set('passConfig', {min:6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials', 'hasCyrilic']});

// univalid.check(unipack);
// console.log(univalid.getState)

// let nodes = univalid.get('$fields');

// nodes.forEach(elem => {
// 	console.log(elem.getAttribute('name'))
// })


// setTimeout(()=>{
// 	univalid.get('send');
// }, 1000);
