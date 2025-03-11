import express, { Application, Request, Response } from 'express';
import pessoasRoutes from './pessoasRoutes';

const configurarRotas = (app: Application) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send('Olá mundo!');
    });

    // Middleware
    app.use(express.json());
    app.use('/', pessoasRoutes);
}

export default configurarRotas;