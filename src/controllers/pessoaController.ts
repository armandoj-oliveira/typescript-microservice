import { Request, Response } from 'express';
import { Pessoa } from '../models/Pessoa';
import { verificarPessoaExistente } from '../utils/verificarPessoaHelper';
import UnidadeController from './UnidadeController';

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
            const { usuario } = req.body;
            
            if(!usuario) {
                res.status(400).json({ mensagem: 'Usuário não fornecido!' });
                return;
            }
        
            const pessoaResultado = await Pessoa.findOne({ usuario: usuario }).populate('unidade_detalhes').exec();
            res.status(200).json({ mensagem: 'Usuário localizado.', dados: pessoaResultado });
        } catch (erro) {
            console.log(`Erro ao consultar o usuário: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno no servidor.' });
        }
    }

    static criarPessoa = async (req: Request, res: Response): Promise<void> => {
        try {
            const { usuario, unidade_id } = req.body;

            if(!usuario) {
                res.status(400).json({ mensagem: 'Usuário não fornecido!' });
                return;
            }

            const pessoa = await verificarPessoaExistente(usuario);

            if(!pessoa) {
                const novaPessoa = await Pessoa.create(req.body);
                res.status(201).json({  mensagem: 'Pessoa cadastrada com sucesso!', dados: novaPessoa });
            } else if (!pessoa.unidade_id.includes(unidade_id)) {
                const pessoaNovaUnidade = await UnidadeController.adicionarUnidade(usuario, unidade_id);
                res.status(200).json({ mensagem: 'Unidade adicionada', dados: pessoaNovaUnidade })
            } else {
                res.status(200).json({ mensagem: 'Pessoa já existe.' });
            }

        } catch (erro) {
            console.log(`Erro ao cadastrar uma nova pessoa: ${(erro as Error).message}`);
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}

export default PessoaController;
