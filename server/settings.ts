import * as _ from 'lodash';

export interface SiteConfig {
	analyticsEnabled: boolean;
	excludePortFromURLs: boolean;
	gaId: string;
	host: string;

	port: number;
	protocol: string;
	siteName: string;
	siteVersion: string;
}

const defaultSettings: SiteConfig = {
	analyticsEnabled: false,
	excludePortFromURLs: false,
	gaId: '',
	host: 'localhost',

	port: 3000,
	protocol: 'http',
	siteName: 'Example App',
	siteVersion: require( '../package.json' ).version,
};

const ConfigOverridesByEnv: {
	[key: string]: Partial<SiteConfig>;
} = {
	production: {
		excludePortFromURLs: true,
		host: 'www.example.com',
		protocol: 'https',
		port: 5050,
	}
};

export function loadAppSettings(): SiteConfig {
	let envSettings: Partial<SiteConfig> = {};
	if ( process.env.CONFIG_ENV ) {
		envSettings = ConfigOverridesByEnv[process.env.CONFIG_ENV];
		if (_.isUndefined(envSettings)) {
			console.error(`No settings found for config environment ${process.env.CONFIG_ENV}`);
			process.exit(1);
		}
	}
	const envOverrides: Partial<SiteConfig> = {};
	_.each(_.keys(defaultSettings), (key: string) => {
		const envKey: string = _.snakeCase(key).toUpperCase();
		if (!_.isUndefined(process.env[envKey])) {
			envOverrides[key] = process.env[envKey];
		}
	});
	const finalConfig: SiteConfig = _.defaultsDeep({}, envOverrides, envSettings, defaultSettings);
	if (process.env.NODE_ENV === 'development') {
		console.log('app loaded with config: ', finalConfig);
	}
	return finalConfig;
}
