'use strict';

const Univalid = require('./modules/univalid');

const univalid = Univalid();

const {unipack} = require('./modules/data');


// console.log(univalid.getValidHandler);


univalid.on('start:valid', uni => {
    console.log('start');
});
univalid.on('end:valid', uni => {
    console.log('end');
});

// univalid.on('end:valid:field', field => {
//     console.log(field);
// });

// univalid.set('passConfig', {min:6, analysis: ['hasUppercase', 'hasLowercase', 'hasDigits', 'hasSpecials', 'hasCyrilic']});

univalid.check(unipack);
console.log(univalid.getState)
