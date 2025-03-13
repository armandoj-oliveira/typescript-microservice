import { Response } from 'express';

class Erro extends Error {
    status: number;

    constructor( mensagem = 'Erro interno do Servidor.', status = 500) {
        super(mensagem);
        this.status = status;
        Object.setPrototypeOf(this, Erro.prototype); 
    }

    enviarRespostaErro(res: Response) {
        res.status(this.status).json({
            mensagem: this.message,
            status: this.status
        });
    }
}

export default Erro;