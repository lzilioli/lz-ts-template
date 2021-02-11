/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/typedef */
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const getWebpackEntryMap = require('./util/getWebpackEntryMap');
const appPaths = require(path.resolve('app-paths'))
/* eslint-enable no-undef */

// eslint-disable-next-line no-undef
module.exports = merge([
	// eslint-disable-next-line no-undef
	require('./util/webpack.base.js'),
	{
		target: 'node',
		externals: [nodeExternals()],
		entry: getWebpackEntryMap(path.join(appPaths.codeFolder, appPaths.libFolder)),
		output: {
			path: path.resolve(path.join(appPaths.distFolder, appPaths.libFolder)),
			filename: '[name].js',
			library: 'lzTsTemplate',
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
		plugins: [
			new webpack.DefinePlugin({
				IS_BROWSER: false,
			}),
		]
	}
]);
