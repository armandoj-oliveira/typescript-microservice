import { Application, NextFunction, Request, Response } from 'express';
import pessoasRoutes from './pessoasRoutes';
import unidadeRoutes from './unidadeRoutes';
import { verificarInstituicaoMiddleware } from '../middleware/verificarInstituicaoMiddleware';
import manipuladorErroMiddleware from '../middleware/manipuladorErroMiddleware';

const configurarRotas = (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log("📥 Requisição recebida:");
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
        next();
    });

    // Middleware de Verificacao
    app.use(verificarInstituicaoMiddleware);

    // Middleware de Rotas
    app.use('/pessoas', pessoasRoutes);
    app.use('/unidades', unidadeRoutes);

    // Middlewre de Erro
    app.use(manipuladorErroMiddleware);
}

export default configurarRotas;