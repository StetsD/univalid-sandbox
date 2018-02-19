const path = require('path');


module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'univalid.js'
    },
	devtool: 'eval',
	devServer: {
		contentBase: path.join(__dirname, 'public')
	}
}
