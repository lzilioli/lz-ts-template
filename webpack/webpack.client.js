const webpack = require( 'webpack' );
const merge = require('webpack-merge');
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const getWebpackEntryMap = require('./util/getWebpackEntryMap');
const appPaths = require('../app-paths');

module.exports = merge([
	require('./util/webpack.base.js'),
	{
		target: 'web',
		entry: getWebpackEntryMap(appPaths.clientFolder),
		output: {
			path: path.resolve(path.join(appPaths.publicDistFolder, appPaths.buildFolder)),
			filename: '[name].js'
		},
		resolve: {
			alias: {
				'@sass': path.resolve( appPaths.sassFolder ),
				"@client": path.resolve(appPaths.clientFolder),
				"@views": path.resolve(appPaths.viewsFolder),
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
			})
		]
	}
]);
