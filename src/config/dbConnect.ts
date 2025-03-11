import mongoose from 'mongoose';

async function conectarBanco(): Promise<mongoose.Connection> {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING as string);
        console.log("Conectado ao MongoDB...");
        return mongoose.connection;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}

export default conectarBanco;
