import { render404 } from '@server/middleware/render-404';
import { Request, Response, Router } from 'express';
import {debug} from '@lib/debug';

export const MyFirstRouter: Router = Router();

MyFirstRouter.get('/', function (_req: Request, res: Response) {
    res.render('index', {
        siteTitle: 'Hello World',
    });
});

MyFirstRouter.get('/contact', (_req: Request, res: Response) => {
    res.render('contact', {
        siteTitle: 'Contact',
    });
});

MyFirstRouter.get('*', (_req: Request, res: Response): void => {
    debug('404ing, route not recognized')
    render404(_req, res);
});