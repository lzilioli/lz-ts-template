import { SiteConfig } from 'lib/settings';

export function getHostWithPort( config: Pick<SiteConfig, 'port' | 'host' | 'excludePortFromURLs'> ): string {
	let full: string = config.host;
	if( ( `${config.port}` ) !== '8080' && !config.excludePortFromURLs ) {
		full += `:${config.port}`;
	}
	return full;
}
