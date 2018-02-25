'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyForm = require('./modules/univalid-strategy-form');

const univalid = Univalid();
univalid.setStrategy(UnivalidStrategyForm({
	$form: '.js-reg-form',
	core: univalid,

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
		type: 'POST',
		url: '/',
		// notDisableSubmit: true
	},

	keyLogger: true
}));

// univalid.set('core', univalid);

// univalid.check();

// const {unipack} = require('./modules/data');

univalid.on('start:valid', uni => {
    console.log('start', uni);
});
univalid.on('end:valid', uni => {
    // console.log('end', uni);
	// console.log(univalid.getState)
});

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


setTimeout(()=>{
	univalid.get('send');
}, 1000);
