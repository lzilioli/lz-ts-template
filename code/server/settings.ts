import _ from 'lodash';
import config from 'config';
import { debug } from '@lib/debug';

export interface SiteConfig {
	analyticsEnabled: boolean;
	gaId: string;
	host: string;

	port: number;
	protocol: string;
	siteName: string;
	siteVersion: string;
}

const defaultSettings: SiteConfig = {
	analyticsEnabled: false,
	gaId: config.has('gaId') ? config.get('gaId') : '',
	host: config.has('host') ? config.get('host') : 'localhost',
	port: 3000,
	protocol: 'http',
	siteName: require('../../package.json').name,
	siteVersion: require( '../../package.json' ).version,
};

const ConfigOverridesByEnv: {
	[key: string]: Partial<SiteConfig>;
} = {
	production: {
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
		debug('app loaded with config: ', finalConfig);
	}
	return finalConfig;
}
