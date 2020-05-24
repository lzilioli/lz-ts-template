import compression from 'compression';
import Express from 'express';
import exphbs from 'express-handlebars';
import { SiteConfig } from '@server/settings';
import * as path from 'path';
import { handlebarsHelpers } from '@lib/handlebars-helpers';
import appPaths from 'app-paths';

export interface BlogModel {
	siteTitle: string;
}

export function serve( config: SiteConfig ): Express.Application {

	const app: Express.Application = Express();
	app.use( compression() );
	app.use( '/gui/', Express.static( path.resolve( path.join( appPaths.publicDistFolder ) ) ) );
	app.set( 'views', appPaths.viewsFolder );
	const hbs: {
		engine: (path: string, options: object, callback: (e: unknown, rendered: string) => void) => void;
		render: (template: string, model?: unknown) => Promise<string>;
	} = exphbs.create( {
		layoutsDir: path.join( appPaths.viewsFolder, appPaths.viewsLayoutsFolder ),
		partialsDir: path.join(appPaths.viewsFolder, appPaths.viewsPartialsFolder),
		compilerOptions: {
			preventIndent: true
		},
		defaultLayout: 'main',
		helpers: handlebarsHelpers(config)
	} );

	function render404( res: exphbs.Response ): void {
		res.status( 404 ).render( '404', {
			siteTitle: 'Page Not Found',
		} as BlogModel );
	}

	app.engine( 'handlebars', hbs.engine );
	app.set( 'view engine', 'handlebars' );

	if( process.env.NODE_ENV !== 'production' ) {
		app.use( '*', ( req: exphbs.Request, res: exphbs.Response, next: () => void ): void => {
			if( req.query.jsonmode ) {
				res.render = ( _page: string, model: unknown ): string => {
					return res.json( model );
				};
			}
			next();
		} );
	}

	app.get( '/', function( _req: exphbs.Request, res: exphbs.Response ) {
		res.render( 'index', {
			siteTitle: 'Hello World',
		} as BlogModel );
	} );

	app.get( '/contact', ( _req: exphbs.Request, res: exphbs.Response ) => {
		res.render( 'contact', {
			siteTitle: 'Contact',
		} as BlogModel );
	} );

	app.get( '*', ( _req: exphbs.Request, res: exphbs.Response ) => {
		render404( res );
	} );

	return app;
}
