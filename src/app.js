import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const resposta={
        mensagem: 'Sistema de Veículos - API',
        version: '1.0.0',
    
    }
    res.status(200).json(resposta);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sistema inicializado:  Acesso http://localhost:${PORT}`);
});