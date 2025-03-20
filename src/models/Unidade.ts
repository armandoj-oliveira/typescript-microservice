import mongoose from "mongoose";
import IUnidade from "../interface/IUnidade";

const unidadeSchema = new mongoose.Schema<IUnidade>({
    unidade_id: { 
        type: Number, 
        required: [true, 'O ID da unidade é obrigatório.'] 
    },
    unidade_sigla: { 
        type: String, 
        required: [true, 'A sigla da unidade é obrigatório.'] 
    },
    unidade_nome: { 
        type: String, 
        required: [true, 'O nome da unidade é obrigatório.'] 
    },
    unidade_instituicao: { 
        type: String, 
        required: [true, 'A instituição da unidade é obrigatório.']  
    }
}, { timestamps: true });

const Unidade = mongoose.model('Unidade', unidadeSchema, 'unidades'); // referencia à collection

export default Unidade;