'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyDefault = require('./modules/univalid-strategy-default');

const univalidStrategyDefault = new UnivalidStrategyDefault();
const univalid = Univalid(univalidStrategyDefault);

const {unipack} = require('./modules/data');


// console.log(univalid.getValidHandler);


univalid.on('start:valid', uni => {
    console.log('start');
});
univalid.on('end:valid', uni => {
    console.log('end');
});

univalid.on('end:valid:field', field => {
    console.log(field);
});


univalid.check(unipack);
