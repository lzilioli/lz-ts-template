import compression from 'compression';
import Express, {Request, Response, Application} from 'express';
import exphbs from 'express-handlebars';
import { SiteConfig } from '@server/settings';
import * as path from 'path';
import { handlebarsHelpers } from '@lib/handlebars-helpers';
import appPaths from 'app-paths';

export function getExpressApp( config: SiteConfig ): Application {

	const app: Application = Express();
	app.use( compression() );
	app.use( '/gui/', Express.static( path.resolve( path.join( appPaths.publicDistFolder ) ) ) );
	app.set( 'views', path.join( appPaths.codeFolder, appPaths.viewsFolder ) );
	const hbs: Exphbs = exphbs.create( {
		layoutsDir: path.join( appPaths.codeFolder, appPaths.viewsFolder, appPaths.viewsLayoutsFolder ),
		partialsDir: path.join( appPaths.codeFolder, appPaths.viewsFolder, appPaths.viewsPartialsFolder ),
		compilerOptions: {
			preventIndent: true
		},
		defaultLayout: 'main',
		helpers: handlebarsHelpers(config)
	} );

	app.engine( 'handlebars', hbs.engine );
	app.set( 'view engine', 'handlebars' );

	if( process.env.NODE_ENV !== 'production' ) {
		app.use( '*', ( req: Request, res: Response, next: () => void ): void => {
			if( req.query.jsonmode ) {
				res.render = ( _page: string, model: unknown ): string => {
					return res.json( model ) as unknown as string;
				};
			}
			next();
		} );
	}

	return app;
}
