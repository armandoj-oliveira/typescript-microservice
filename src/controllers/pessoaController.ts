import { Pessoa } from '../models/Pessoa';
import { Request, Response } from 'express';

class PessoaController {
    static consultarPessoa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { nome_usuario } = req.params;

            if (!nome_usuario) {
                return res.status(400).json({ message: 'O parâmetro "nome_usuario" é obrigatório.' });
            }

            const resultadoPessoa = await Pessoa.findOne({ nome_usuario }).populate('unidade_id').exec();

            if (!resultadoPessoa) {
                return res.status(404).json({ message: 'Pessoa não localizada.' });
            }

            return res.status(200).json(resultadoPessoa);

        } catch (error) {
            console.error(`Erro ao consultar usuário: ${error}`);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    static criarPessoa = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { nome_usuario, usuario, instituicao, unidade_id, infra_hash } = req.body;

            if (!nome_usuario || !usuario || !instituicao || !unidade_id || !infra_hash) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            const pessoaExistente = await Pessoa.findOne({ nome_usuario });

            if (pessoaExistente) {
                return res.status(409).json({ message: 'Pessoa já existe.' });
            }

            const novaPessoa = new Pessoa({
                nome_usuario,
                usuario,
                instituicao,
                unidade_id,
                infra_hash
            });

            await novaPessoa.save();
            return res.status(201).json(novaPessoa);

        } catch (error) {
            console.error(`Erro ao criar usuário: ${error}`);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }
}

export default PessoaController;