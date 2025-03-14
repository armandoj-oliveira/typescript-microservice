import { Request, Response, NextFunction } from 'express';
import { Pessoa } from '../models/Pessoa';
import { verificarPessoaExistente } from '../utils/verificarPessoaHelper';
import validarEntradaDados from '../utils/validarEntradaDadosHelper';
import UnidadeController from './UnidadeController';
import ErroValidacao from '../errors/ErroValidacao';

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
            validarEntradaDados(req.body, ["usuario"]);
    
            const pessoaResultado = await Pessoa.findOne({ usuario: req.body.usuario }).populate('unidade_detalhes').exec();
    
            if (!pessoaResultado) {
                throw new ErroValidacao('Usuário não encontrado.', 404);
            }
    
            res.status(200).json({ mensagem: 'Usuário localizado.', dados: pessoaResultado });
        } catch (erro) {
            next(erro);
        }
    }
    

    static criarPessoa = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            validarEntradaDados(req.body, ["nome_usuario", "usuario", "instituicao", "unidade_id", "infra_hash"]);

            const pessoa = await verificarPessoaExistente(req.body.usuario);

            if (!pessoa) {
                const novaPessoa = await Pessoa.create(req.body);
                res.status(201).json({ mensagem: 'Pessoa cadastrada com sucesso!', dados: novaPessoa });
            } else if (!pessoa.unidade_id.includes(req.body.unidade_id)) {
                const pessoaNovaUnidade = await UnidadeController.adicionarUnidade(req.body.usuario, req.body.unidade_id);
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
