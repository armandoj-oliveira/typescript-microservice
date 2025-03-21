import "dotenv/config";
import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import conectarBanco from "./config/dbConnect";
import configurarRotas from './routes/index';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

configurarRotas(app);

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        const db = await conectarBanco();

        db.on('error', console.error.bind(console, 'Conexão falhou'));
        db.once('open', () => console.log('Conexão bem-sucedida'));

            app.listen(PORT, () => {
                console.log(`Servidor rodando na porta ${PORT}`);
            });

    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
};

iniciarServidor();

export default app;
