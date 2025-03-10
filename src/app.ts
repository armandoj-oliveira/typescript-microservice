import express from 'express';
import cors from 'cors';
import router from './routes/index';

const app = express();
router(app);

app.use(cors())
app.use(express.json());

export default app;