
import express from 'express';
import * as veiculo from '../controllers/veiculoController.js';
import autenticar from '../middlewares/auth.js';

const router = express.Router();

router.get('/veiculos', autenticar, veiculo.consultarTodos);
router.post('/veiculo', autenticar, veiculo.cadastrar);
router.get('/veiculo/:id', autenticar, veiculo.consultarid);
router.put('/veiculo/:id', autenticar, veiculo.editar);
router.delete('/veiculo/:id', autenticar, veiculo.deletar);

export default router;