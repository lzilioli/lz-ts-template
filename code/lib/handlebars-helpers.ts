import { getHostWithPort } from '@server/util';
import * as _ from 'lodash';
import * as path from 'path';
import { SiteConfig } from '@server/settings';

interface SiteHandlebarsHelpers {
	sitePath: (...args: unknown[]) => string;
	fullSitePath: (...args: unknown[]) => string;
	imgPath: (...args: unknown[]) => string;
	toJson: (...args: unknown[]) => string;
}

export const handlebarsHelpers: (config: SiteConfig) => SiteHandlebarsHelpers = (config: SiteConfig): SiteHandlebarsHelpers => {
	return {
		sitePath: ( ...args: string[] ): string => {
			const input: string[] = _.slice( args, 0, args.length - 1 );
			const joinedInput: string = _.join( input, '/' );
			return `/${joinedInput}`;
		},
		fullSitePath: ( ...args: string[] ): string => {
			const input: string[] = _.slice( args, 0, args.length - 1 );
			const joinedInput: string = _.join( input, '/' );
			return `${getHostWithPort( {
				port: config.port,
				hostname: config.host,
				protocol: config.protocol,
			} )}/${path.join( joinedInput )}`;
		},
		imgPath: ( ...args: string[] ): string => {
			const input: string[] = _.slice( args, 0, args.length - 1 );
			const joinedInput: string = _.join( input, '/' );
			return `${getHostWithPort( {
				port: config.port,
				hostname: config.host,
				protocol: config.protocol,
			} )}/${path.join( 'gui/im/', joinedInput )}`;
		},
		toJson: ( data: unknown ): string => {
			return JSON.stringify( data, null, 2 );
		}
	};
}
