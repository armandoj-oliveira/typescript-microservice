import express, { Application, Request, Response } from 'express';
import pessoasRoutes from './pessoasRoutes';
import unidadeRoutes from './unidadeRoutes';
import { verificarInstituicaoMiddleware } from '../middleware/verificarInstituicaoMiddleware';
import manipuladorErroMiddleware from '../middleware/manipuladorErroMiddleware';

const configurarRotas = (app: Application) => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send('Olá mundo!');
    });

    app.use(express.json());

    // Middleware de Verificacao
    app.use(verificarInstituicaoMiddleware);

    // Middleware de Rotas
    app.use('/pessoas', pessoasRoutes);
    app.use('/unidades', unidadeRoutes);

    // Middlewre de Erro
    app.use(manipuladorErroMiddleware);
}

export default configurarRotas;