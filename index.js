'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyDefault = require('./modules/univalid-strategy-default');

const univalidStrategyDefault = new UnivalidStrategyDefault();
const univalid = Univalid(univalidStrategyDefault);

const {unipack} = require('./modules/data');


// console.log(univalid.getValidHandler);


univalid.on('start:valid', uni => {
    console.log(uni);
});
univalid.on('end:valid', uni => {
    console.log(uni);
})


univalid.check(unipack);
