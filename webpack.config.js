const path = require('path');


module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'univalid.js'
    },
	devServer: {
		contentBase: path.join(__dirname, 'public')
	}
}
