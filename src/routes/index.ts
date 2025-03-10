import express, { Request, Response } from 'express';
import pessoa from './pessoasRoutes'

const router = (app: express.Application) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send('Olá mundo!');
    });

    app.use(express.json(), pessoa);
}

export default router;
