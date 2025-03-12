import { Pessoa } from '../models/Pessoa'

export async function verificarPessoaExistente(usuario: string) {
    return await Pessoa.findOne({ usuario });
}