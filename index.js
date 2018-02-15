const Univalid = require('./modules/univalid');
const univalid = Univalid('test');

const strategyDefault = require('./modules/univalid-strategy-default');

univalid.regStrategy(strategyDefault);
