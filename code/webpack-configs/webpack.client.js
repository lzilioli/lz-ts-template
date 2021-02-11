/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/typedef */
const webpack = require( 'webpack' );
const merge = require('webpack-merge');
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const getWebpackEntryMap = require('./util/getWebpackEntryMap');
const appPaths = require(path.resolve('app-paths'));
/* eslint-enable no-undef */

// eslint-disable-next-line no-undef
module.exports = merge([
	// eslint-disable-next-line no-undef
	require('./util/webpack.base.js'),
	{
		target: 'web',
		entry: getWebpackEntryMap(path.join(appPaths.codeFolder, appPaths.clientFolder)),
		output: {
			path: path.resolve(path.join(appPaths.publicDistFolder, appPaths.buildFolder)),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				"@sass": path.resolve(path.join(appPaths.codeFolder, appPaths.sassFolder)),
				"@client": path.resolve(path.join(appPaths.codeFolder, appPaths.clientFolder)),
			}
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.js$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.handlebars$/,
					use: 'handlebars-loader?rootRelative=../../client/'
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin( {
				$: 'jquery'
			} ),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
			new webpack.DefinePlugin({
				IS_BROWSER: true,
			}),
		]
	}
]);
