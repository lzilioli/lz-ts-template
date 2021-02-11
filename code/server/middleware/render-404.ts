import {Request, Response} from 'express';

export function render404(_req: Request, res: Response): void {
    res.status(404).render('404', {
        siteTitle: 'Page Not Found',
    });
}