import mongoose from "mongoose";

const stringConexao = process.env.DB_CONNECTION_STRING as string;

if (!stringConexao) {
  throw new Error('Endereço do Banco não está definido!');
}

async function dbConnect() {
    try {
        mongoose.connect(stringConexao);

        console.log('Conectando ao MongoDB...');
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB: ', error);
    }
}

export default dbConnect;