const merge = require('webpack-merge');
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');
const getWebpackEntryMap = require('./util/getWebpackEntryMap');

module.exports = merge([
	require('./util/webpack.base.js'),
	{
		target: 'node',
		externals: [nodeExternals()],
		entry: getWebpackEntryMap('server'),
		output: {
			path: path.resolve('build/server'),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				"@server": path.resolve("server"),
			}
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}
			]
		},
	}
]);
