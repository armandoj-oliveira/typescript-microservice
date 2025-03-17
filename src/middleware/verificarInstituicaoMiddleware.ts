import { Request, Response, NextFunction } from "express";

const INSTITUICOES = process.env.INSTITUICOES_PERMITIDAS?.split(",") || [];

const verificarInstituicaoMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { instituicao } = req.body;

    if (!instituicao || !INSTITUICOES.includes(instituicao.trim())) {
        res.status(403).json({ mensagem: "Acesso negado para esta insitiuição" });
        return;
    }

    next();
}

export { verificarInstituicaoMiddleware };