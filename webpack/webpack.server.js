const merge = require('webpack-merge');
const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');
const getWebpackEntryMap = require('./util/getWebpackEntryMap');
const appPaths = require('../app-paths');

module.exports = merge([
	require('./util/webpack.base.js'),
	{
		target: 'node',
		externals: [nodeExternals()],
		entry: getWebpackEntryMap(appPaths.serverFolder),
		output: {
			path: path.resolve(path.join(appPaths.buildFolder, appPaths.serverFolder)),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				"@server": path.resolve(appPaths.serverFolder),
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
