import Unidade from "../models/Unidade";

export async function verificarUnidadeExistente(unidade_id: number): Promise<boolean> {
    const unidade = await Unidade.findOne({ unidade_id });
    return !!unidade; // Retorna booleano
}