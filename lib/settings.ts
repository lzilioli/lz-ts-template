import * as _ from 'lodash';

export interface SiteConfig {
	analyticsEnabled: boolean;
	excludePortFromURLs: boolean;
	gaId: string;
	host: string;

	port: number;
	protocol: string;
	publicDirectory: string;
	siteName: string;
	siteVersion: string;
	viewsDir: string;
}

const defaultSettings: SiteConfig = {
	analyticsEnabled: false,
	excludePortFromURLs: false,
	gaId: '',
	host: 'localhost',

	port: Number(process.env.PORT) || 3000,
	protocol: 'http',
	publicDirectory: 'dist/public',
	siteName: 'Example App',
	siteVersion: require( '../package.json' ).version,
	viewsDir: 'dist/views',
};

const herokuConfig: Partial<SiteConfig> = {
	analyticsEnabled: false,
	excludePortFromURLs: true,
	host: 'www.example.com',
	protocol: 'https',
};

/**
 * Function that returns a configuration given a path to a file in which defaults
 * are specified, and a path to a file in which user overrides are specified.
 * Resulting object is defaultSettings object with userSettings object overriding.
 *
 * @return {Object}							The app's settings with user's overriding default
 */
export function loadAppSettings(): SiteConfig {
	let envSettings: Partial<SiteConfig> = {};
	if ( process.env.NODE_ENV === 'production' ) {
		envSettings = herokuConfig;
	}
	const finalConfig: SiteConfig = _.defaultsDeep({}, envSettings, defaultSettings);
	console.log(finalConfig);
	return finalConfig;
}
