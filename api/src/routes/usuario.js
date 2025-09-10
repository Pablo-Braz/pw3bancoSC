import express from 'express';
import * as usuario from '../controllers/usuario.js';
import { middlewareAutenticacao } from '../middlewares/Authentificação.js';

const router = express.Router();

router.get('/usuario/logado', middlewareAutenticacao, usuario.consultarLogado);
router.get('/usuario', middlewareAutenticacao, usuario.consultar);
router.get('/usuario/:id', middlewareAutenticacao, usuario.consultarPorId);
router.delete('/usuario/:id', middlewareAutenticacao, usuario.deletar);
router.put('/usuario/:id', middlewareAutenticacao, usuario.alterar);
router.post('/usuario', usuario.cadastrar); // Cadastro é público

export default router;
