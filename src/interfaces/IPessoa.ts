import mongoose from "mongoose";

export default interface IPessoa {
    nome_usuario: string;
    usuario: string;
    instituicao: string;
    unidade_id: mongoose.Types.ObjectId[]; 
    infra_hash: string[];
}