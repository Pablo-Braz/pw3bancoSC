import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/veiculos', veiculo.consultarTodos);
router.post('/veiculo', veiculo.cadastrar);
router.get('/veiculo/:id', veiculo.consultarid);

export default router;