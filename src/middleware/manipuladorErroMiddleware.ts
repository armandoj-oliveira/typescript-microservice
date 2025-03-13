import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Erro from "../errors/Erro";
import ErroValidacao from "../errors/ErroValidacao";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manipuladorErroMiddleware: ErrorRequestHandler = (erro: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Erro capturado:", erro);

    if (erro instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ mensagem: "Erro de validação.", erros: erro.errors });
        return;
    } else if (erro instanceof mongoose.Error.CastError) {
        res.status(400).json({ mensagem: `Erro no campo '${erro.path}': Valor inválido (${erro.value}).` });
        return;
    } else if (erro instanceof ErroValidacao) {
        res.status(erro.status).json({ mensagem: erro.message });
        return;
    } else if (erro instanceof Erro) {
        erro.enviarRespostaErro(res);
        return;
    } else if (erro instanceof Error) {
        res.status(500).json({ mensagem: "Erro interno do servidor.", detalhes: erro.message });
        return;
    } else {
        res.status(500).json({ mensagem: "Erro interno do servidor.", detalhes: "Ocorreu um erro inesperado." });
    }
};

export default manipuladorErroMiddleware;
