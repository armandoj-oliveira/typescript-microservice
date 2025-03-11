import { Request, Response } from 'express';
import { Pessoa } from '../models/Pessoa';
// import { obterObjectIdUnidade } from '../utils/unidadeHelper';

class PessoaController {
    static consultarTodasPessoas = async (req: Request, res: Response): Promise<void> => {
        try {
            const listarPessoas = await Pessoa.find().lean();
            res.status(200).json(listarPessoas);
        } catch (error) {
            console.error(`Erro ao consultar todas as pessoas: ${error}`);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    };

    static consultarPessoa = async (req: Request, res: Response): Promise<void> => {
        try {
            const { usuario } = req.params;
    
            if (!usuario) {
                res.status(400).json({ message: 'O parâmetro "usuario" é obrigatório.' });
                return;
            }
    
            let resultadoPessoa = await Pessoa.findOne({ usuario }).lean();
    
            if (!resultadoPessoa) {
                res.status(404).json({ message: 'Pessoa não localizada.' });
                return;
            }
    
            res.status(200).json(resultadoPessoa);
        } catch (error) {
            console.error(`Erro ao consultar usuário: ${error}`);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    };
    
    
    static criarPessoa = async (req: Request, res: Response): Promise<void> => {
        try {
            const { nome_usuario, usuario, instituicao, unidade_id, infra_hash } = req.body;

            if (!nome_usuario || !usuario || !instituicao || !unidade_id || !infra_hash) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
                return;
            }

            const pessoaExistente = await Pessoa.findOne({ usuario: usuario });

            if (pessoaExistente) {
                res.status(409).json({ message: 'Pessoa já existe.' });
                return;
            }

            const novaPessoa = new Pessoa({
                nome_usuario,
                usuario,
                instituicao,
                unidade_id,
                infra_hash
            });

            await novaPessoa.save();
            res.status(201).json(novaPessoa);
        } catch (error) {
            console.error(`Erro ao criar usuário: ${error}`);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    };
}

export default PessoaController;
