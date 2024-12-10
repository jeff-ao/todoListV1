import express from "express";
import tarefaController from "../controllers/tarefaController.js";

const router = express.Router();

router.post("/", tarefaController.criarTarefa);
router.get("/", tarefaController.obterTarefas);
router.put("/:id", tarefaController.atualizarTarefa);
router.delete("/:id", tarefaController.deletarTarefa);

export default router;
