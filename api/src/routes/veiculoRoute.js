
import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';
import { middlewareAutenticacao } from '../middlewares/Authentificação.js';

const router = express.Router();

router.get('/veiculos', middlewareAutenticacao, veiculo.consultarTodos);
router.post('/veiculo', middlewareAutenticacao, veiculo.cadastrar);
router.get('/veiculo/:id', middlewareAutenticacao, veiculo.consultarid);
router.put('/veiculo/:id', middlewareAutenticacao, veiculo.editar);
router.delete('/veiculo/:id', middlewareAutenticacao, veiculo.deletar);

export default router;