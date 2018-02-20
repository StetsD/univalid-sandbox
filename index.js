'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyForm = require('./modules/univalid-strategy-form');

const univalid = Univalid(new UnivalidStrategyForm({
	$form: '.js-reg-form'
}));

const {unipack} = require('./modules/data');


// console.log(univalid.getValidHandler);


univalid.on('start:valid', uni => {
    console.log('start', uni);
});
univalid.on('end:valid', uni => {
    console.log('end', uni);
});

// univalid.on('end:valid:field', field => {
//     console.log(field);
// });

// univalid.set('passConfig', {min:6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials', 'hasCyrilic']});

// univalid.check(unipack);
// console.log(univalid.getState)

console.log(univalid.get('$fields'))
