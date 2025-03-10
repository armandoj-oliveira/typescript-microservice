import mongoose, { Document } from "mongoose";
import IPessoa from "../interfaces/IPessoa";

export interface IPessoaDocument extends IPessoa, Document {}

const pessoaSchema = new mongoose.Schema<IPessoaDocument>({
    nome_usuario: {
        type: String,
        required: [true, "O nome do usuário é obrigatório."],
        trim: true
    },
    usuario: {
        type: String,
        required: [true, "O usuário do sistema é obrigatório."],
        trim: true,
    },
    instituicao: {
        type: String,
        required: [true, "A instituição do usuário é obrigatória."],
        trim: true,
    },
    unidade_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unidade',
        required: [true, "O ID da unidade do usuário é obrigatório."],
    },
    infra_hash: {
        type: String,
        required: [true, "O hash do usuário é obrigatório."],
        trim: true,
    },
}, { timestamps: true });

const Pessoa = mongoose.model<IPessoaDocument>('usuarios', pessoaSchema);

export { Pessoa, pessoaSchema };