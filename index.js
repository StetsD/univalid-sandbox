'use strict';

const Univalid = require('./modules/univalid');
const UnivalidStrategyDefault = require('./modules/univalid-strategy-default');

const univalidStrategyDefault = new UnivalidStrategyDefault();
const univalid = Univalid(univalidStrategyDefault);

univalid.check();
