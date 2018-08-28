const path = require('path');


module.exports = {
    entry: {
		univalid: './index.js',
		'geo-rx': './geo-rx.js'
	},
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
	devtool: 'eval',
	devServer: {
		contentBase: path.join(__dirname, 'public')
	}
}
