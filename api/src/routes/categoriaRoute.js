
import express from 'express';
import * as categoria from '../controllers/categoriaController.js';
import autenticar from '../middlewares/auth.js';

const router = express.Router();

router.post('/categoria', autenticar, categoria.cadastrar);
router.get('/categorias', autenticar, categoria.listar);
router.get('/categoria/:id', autenticar, categoria.buscarPorId);
router.put('/categoria/:id', autenticar, categoria.atualizar);
router.delete('/categoria/:id', autenticar, categoria.deletar);

export default router;
