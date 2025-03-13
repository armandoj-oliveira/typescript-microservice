import { Request, Response, NextFunction } from 'express';
import { Pessoa } from '../models/Pessoa';
import { verificarPessoaExistente } from '../utils/verificarPessoaHelper';
import UnidadeController from './UnidadeController';
import Erro from '../errors/Erro';

class PessoaController {
    static consultarTodasPessoas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const listarPessoas = await Pessoa.find();
            res.status(200).json(listarPessoas);
        } catch (erro) {
            next(erro);
        }
    };

    static consultarPessoa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { usuario } = req.body;
            
            if (!usuario) {
                throw new Erro('Usuário não fornecido!', 400);
            }
        
            const pessoaResultado = await Pessoa.findOne({ usuario }).populate('unidade_detalhes').exec();

            if (!pessoaResultado) {
                throw new Erro('Usuário não encontrado.', 404);
            }

            res.status(200).json({ mensagem: 'Usuário localizado.', dados: pessoaResultado });
        } catch (erro) {
            next(erro);
        }
    }

    static criarPessoa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { usuario, unidade_id } = req.body;

            if (!usuario) {
                throw new Erro('Usuário não fornecido!', 400);
            }

            const pessoa = await verificarPessoaExistente(usuario);

            if (!pessoa) {
                const novaPessoa = await Pessoa.create(req.body);
                res.status(201).json({ mensagem: 'Pessoa cadastrada com sucesso!', dados: novaPessoa });
            } else if (!pessoa.unidade_id.includes(unidade_id)) {
                const pessoaNovaUnidade = await UnidadeController.adicionarUnidade(usuario, unidade_id);
                res.status(200).json({ mensagem: 'Unidade adicionada', dados: pessoaNovaUnidade });
            } else {
                res.status(200).json({ mensagem: 'Pessoa já existe.' });
            }
        } catch (erro) {
            next(erro);
        }
    }
}

export default PessoaController;
