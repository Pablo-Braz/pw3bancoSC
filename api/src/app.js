import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

// Importando as rotas
import veiculoRoute from './routes/veiculoRoute.js';
import usuarioRoute from './routes/usuario.js';
import autenticacaoRoute from './routes/autenticacao.js';

const app = express();

app.use(cors({
    origin: (origin, cb) => cb(null, origin || true),
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Rotas de públicas
app.get('/',(req,res)=>{
    const rootDomain = req.protocol + '://' + req.get('host');
    res.status(200).json({     
        status_server: 'ok',
        dominio_raiz : rootDomain,
        atualização: '14/09/2024 - 18:42',
        rotas:{
            'POST - Login': `${rootDomain}/api/usuario/login`,
            'POST - Cadastrar usuário': `${rootDomain}/api/usuario`,
            'GET - Consultar veículo por ID': `${rootDomain}/api/veiculo/{id}`,
            'GET - Consultar todos os veículos': `${rootDomain}/api/veiculos`,
            'POST - Cadastrar veículo':`${rootDomain}/api/veiculo`,
            'PUT - Editar veículo': `${rootDomain}/api/veiculo/{id}`,
            'DELETE - Deletar veículo': `${rootDomain}/api/veiculo/{id}`
        }
    });
});

// Configurando as rotas
app.use('/api', autenticacaoRoute);
app.use('/api', usuarioRoute);
app.use('/api', veiculoRoute);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,()=>{
    console.log('Sistema inicializado: ', `Acesso: http://localhost:${PORT}`);
});
