import mongoose, { Document } from "mongoose";

export interface IUnidade extends Document {
    unidade_id: number;
    unidade_sigla: string;
    unidade_nome: string;
    unidade_instituicao: string;
}

const unidadeSchema = new mongoose.Schema<IUnidade>({
    unidade_id: { 
        type: Number, 
        required: true 
    },
    unidade_sigla: { 
        type: String, 
        required: true 
    },
    unidade_nome: { 
        type: String, 
        required: true 
    },
    unidade_instituicao: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Unidade = mongoose.model<IUnidade>('Unidade', unidadeSchema);

export default Unidade;