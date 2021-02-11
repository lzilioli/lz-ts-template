/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-undef */
const path = require( 'path' );
const appPaths = require(path.resolve('app-paths'));
/* eslint-enable no-undef */

// eslint-disable-next-line no-undef
module.exports =  {
	devtool: '#inline-source-map',
	// eslint-disable-next-line no-undef
	mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
	resolve: {
		extensions: ['.js', '.ts', '.json'],
		alias: {
			"app-paths": path.resolve("app-paths.js"),
			"@lib": path.resolve(path.join(appPaths.codeFolder, appPaths.libFolder)),
		}
	}
};
