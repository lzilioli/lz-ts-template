import * as util from 'util';
import Express from 'express';
import { serve } from '@server/serve';
import { SiteConfig, loadAppSettings } from '@server/settings';
import { getHostWithPort } from '@server/util';

console.log(process.env.NODE_ENV);

const config: SiteConfig = loadAppSettings();
const app: Express.Application = serve( config );
app.listen( config.port, (): void => {
	console.log( util.format( `serving: ${config.protocol}://%s`, getHostWithPort( config ) ) );
} );
