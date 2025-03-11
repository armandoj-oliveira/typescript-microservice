import { Request, Response } from 'express';
import { Pessoa } from '../models/Pessoa';

class PessoaController {
    static consultarTodasPessoas = async (req: Request, res: Response): Promise<void> => {
        try {
            const listarPessoas = await Pessoa.find();
            res.status(200).json(listarPessoas);
        } catch (erro) {
            console.log(`Erro ao consultar todas as pessoas: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
        }
    };


    static consultarPessoa = async (req: Request, res: Response): Promise<void> => {
        
        try {
            const { usuario } = req.params;
            
            if(!usuario) {
                res.status(400).json({ mensagem: 'Usuário não fornecido!' });
                return;
            };
            
            const pessoaResultado = await Pessoa.findOne({ usuario: usuario }).populate('unidade_detalhes').exec();
            
            // Caso não encontre, possibilidade de cadastrar - implementado mais para frente!
            if(!pessoaResultado) {
                res.status(404).json({ mensagem: `O ${usuario} não foi encontrado!` })
            }

            res.status(200).json({
                mensagem: 'Usuário localizado.',
                dados: pessoaResultado
            });

        } catch (erro) {
            console.log(`Erro ao consultar o usuário: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
        }
    }
}

export default PessoaController;
