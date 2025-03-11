import express, { Application, Request, Response } from 'express';
import pessoasRoutes from './pessoasRoutes';
import unidadeRoutes from './unidadeRoutes';

const configurarRotas = (app: Application) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send('Olá mundo!');
    });

    // Middleware
    app.use(express.json());
    app.use('/pessoa', pessoasRoutes);
    app.use('/unidade', unidadeRoutes);
}

export default configurarRotas;