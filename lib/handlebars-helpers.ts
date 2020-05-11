import { getHostWithPort } from 'lib/util';
import * as _ from 'lodash';
import * as path from 'path';
import { SiteConfig } from 'lib/settings';

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
			return `${config.protocol}://${path.join( `${getHostWithPort( config )}`, joinedInput )}`;
		},
		imgPath: ( ...args: string[] ): string => {
			const input: string[] = _.slice( args, 0, args.length - 1 );
			const joinedInput: string = _.join( input, '/' );
			return `${config.protocol}://${path.join( `${getHostWithPort( config )}`, 'gui/im/', joinedInput )}`;
		},
		toJson: ( data: unknown ): string => {
			return JSON.stringify( data, null, 2 );
		}
	};
}
