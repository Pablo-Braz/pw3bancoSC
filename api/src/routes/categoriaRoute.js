import express from "express";
import autenticar from "../middlewares/autenticacao.js";
import * as categoriaController from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/categorias", autenticar, categoriaController.listar);
router.get("/categoria/:id", autenticar, categoriaController.buscarPorId);
router.post("/categoria", autenticar, categoriaController.criar);
router.put("/categoria/:id", autenticar, categoriaController.atualizarTudo);
router.patch("/categoria/:id", autenticar, categoriaController.atualizar);
router.delete("/categoria/:id", autenticar, categoriaController.deletar);

export default router;
