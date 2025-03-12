import { Request, Response } from 'express';
import { verificarPessoaExistente } from '../utils/verificarPessoaHelper';
import { Pessoa } from '../models/Pessoa';

class HashController {
    static atualizarHashDiario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { usuario, infra_hash } = req.body;

            if(!usuario) {
                res.status(400).json({ mensagem: 'Usuário não fornecido!' });
                return;
            } else if (!infra_hash) {
                res.status(400).json({ mensagem: 'Hash não fornecido!' });
                return;
            }

            const pessoa = await verificarPessoaExistente(usuario);

            if(pessoa) {
                const atualizaPessoa = await Pessoa.findOneAndUpdate( 
                    { usuario }, 
                    { $addToSet: { infra_hash } },
                    { new: true }
                );

                res.status(200).json({ mensagem: 'Hash adicionado', dados: atualizaPessoa });
                return;
            }

            res.status(422).json({ mensagem: 'Dados inválidos' });
        } catch (erro) {
            console.log(`Erro ao atualizar o hash da pessoa: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}

export default HashController;