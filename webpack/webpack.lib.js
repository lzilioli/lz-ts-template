const merge = require('webpack-merge');
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');
const getWebpackEntryMap = require('./util/getWebpackEntryMap');

module.exports = merge([
	require('./util/webpack.base.js'),
	{
		target: 'node',
		externals: [nodeExternals()],
		entry: getWebpackEntryMap('lib'),
		output: {
			path: path.resolve('dist/lib'),
			filename: '[name].js',
			library: 'mdMacros',
			libraryTarget: 'commonjs2'
		},
		resolve: {
			alias: {
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
