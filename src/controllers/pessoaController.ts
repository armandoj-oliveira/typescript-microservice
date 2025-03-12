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
            res.status(200).json({
                mensagem: 'Usuário localizado.',
                dados: pessoaResultado
            });

        } catch (erro) {
            console.log(`Erro ao consultar o usuário: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
        }
    }

    static verificarOuCriarPessoa = async (req: Request, res: Response): Promise<void> => {
        try {
            const { usuario } = req.body;

            if(!usuario) {
                res.status(400).json({ mensagem: 'Usuário não fornecido!' });
                return;
            };

            let pessoa = await Pessoa.findOne({ usuario });

            if(!pessoa) {
                pessoa = await Pessoa.create(req.body);
                res.status(201).json({  mensagem: 'Pessoa cadastrada com sucesso!', dados: pessoa });
            } else {
                res.status(200).json({ mensagem: "Pessoa já existe.", dados: pessoa });
            }
            
        } catch (erro) {
            console.log(`Erro ao cadastrar uma nova pessoa: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}

export default PessoaController;
