import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';

const router = express.Router();


router.get('/veiculos', veiculo.consultarTodos);
router.post('/veiculo', veiculo.cadastrar);
router.get('/veiculo/:id', veiculo.consultarid);
router.post('/veiculo/:id', veiculo.editar);
router.delete('/veiculo/:id', veiculo.deletar);

export default router;