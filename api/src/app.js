import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import instituicoesRoutes from './routes/instituicoesRoutes.js';
import instituicaoUsuarioRoutes from './routes/InstituicaoUsuarioRoutes.js';
import categoriaRoutes from './routes/categoriaRoute.js';
import * as responses from './utils/response.js';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


// Rotas públicas
app.get('/',(req,res)=>{
    const rootDomain = req.protocol + '://' + req.get('host');
    return responses.success(res, { message: 'Sistema inicializado', data: {
        status_server: 'ok',
        dominio_raiz : rootDomain,
        atualização: '14/09/2024 - 18:42',
        rotas:{
            'GET - teste': `${rootDomain}/api/teste/teste`
        }
    }});
});

app.use('/', usuarioRoutes);
app.use('/', instituicoesRoutes);
app.use('/', instituicaoUsuarioRoutes);
app.use('/', categoriaRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT,()=>{
    console.log('Sistema inicializado: ', `Acesso: http://localhost:${PORT}`);
});
