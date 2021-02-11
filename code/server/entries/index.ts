import { debug, vDebug } from '@lib/debug';
import { getExpressApp } from '@server/get-express-app';
import { MyFirstRouter } from '@server/routers/my-first-router';
import { loadAppSettings, SiteConfig } from '@server/settings';
import { getHostWithPort } from '@server/util';
import Express, { Request, Response } from 'express';
import moment from 'moment';

debug(process.env.NODE_ENV);

const siteConfig: SiteConfig = loadAppSettings();
const app: Express.Application = getExpressApp( siteConfig );

app.use('*', (req: Request, res: Response, next: () => void): void => {
	vDebug(req.headers)
	if (!req.headers.host) {
		debug(`request with no host 500ing`);
		res.send(500);
		return;
	}
	req.requestURLPrefix = getHostWithPort({
		protocol: req.protocol,
		hostname: req.hostname,
		port: +req.headers.host.split(':')[1]
	});
	if (req.originalUrl.indexOf('favicon.ico') === -1) {
		debug(`incoming request: ${req.method} ${req.requestURLPrefix}${req.originalUrl}`);
		debug(`      timestamp: ${moment().format('YYYY-MM-DD h:mm:ss a')}`);
	}
	res.charset = 'utf8';
	next();
});

app.use('/', MyFirstRouter);

app.listen( siteConfig.port, (): void => {
	console.log( `serving: ${getHostWithPort( {
		hostname: siteConfig.host,
		protocol: siteConfig.protocol,
		port: siteConfig.port,
	})}` );
} );
