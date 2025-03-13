import { Request, Response, NextFunction } from 'express';
import { verificarPessoaExistente } from '../utils/verificarPessoaHelper';
import { Pessoa } from '../models/Pessoa';
import Erro from '../errors/Erro';
import validarEntradaDados from '../utils/validarEntradaDadosHelper';

class HashController {
    static atualizarHashDiario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            validarEntradaDados(req.body, ["usuario", "infra_hash"]);

            const { usuario, infra_hash } = req.body;

            const pessoa = await verificarPessoaExistente(usuario);

            if (pessoa) {
                const atualizaPessoa = await Pessoa.findOneAndUpdate(
                    { usuario },
                    { $addToSet: { infra_hash } },
                    { new: true }
                );

                res.status(200).json({ mensagem: 'Hash adicionado', dados: atualizaPessoa });
                return;
            }

            throw new Erro('Dados inválidos', 422);
        } catch (erro) {
            next(erro);
        }
    }

}

export default HashController;
