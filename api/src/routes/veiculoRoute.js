import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';

const router = express.Router();

router.get('/veiculo/:id',veiculo.consultar);
router.get('/veiculos',veiculo.consultarTodos);
router.post('/veiculo',veiculo.cadastrar);

export default router;