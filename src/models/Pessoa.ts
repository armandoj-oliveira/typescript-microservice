import mongoose from "mongoose";

const pessoaSchema = new mongoose.Schema(
    {
        nome_usuario: {
            type: String,
            required: [true, "O nome do usuário é obrigatório."],
            trim: true,
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
        unidade_id: [
            {
                type: Number,
                required: [true, "O ID da unidade do usuário é obrigatório."],
            },
        ],
        infra_hash: {
            type: [String],
            required: [true, "O hash do usuário é obrigatório."],
            trim: true,
            default: () => [new Date().toISOString()]
        },
    },
    { 
        timestamps: true,
        versionKey: false,

        // Define a transformação de saída ao converter para JSON
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                delete ret.id; // Remove a chave "id" redundante, já que "_id" está presente
                return ret;
            }
        },

         // Define a transformação de saída ao converter para um objeto
        toObject: { 
            virtuals: true 
        }
    }
);

// Adição de um Virtual para popular os dados da unidade no usuário
pessoaSchema.virtual("unidade_detalhes", {
    ref: "Unidade",
    localField: "unidade_id",
    foreignField: "unidade_id",
    justOne: true,
});

const Pessoa = mongoose.model("usuarios", pessoaSchema);

export { Pessoa, pessoaSchema };