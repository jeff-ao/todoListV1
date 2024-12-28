import express from "express";
import tarefaController from "../controllers/tarefaController.js";

const router = express.Router();

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tarefa:
 *                 type: string
 *               usuario_id:
 *                 type: integer
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro ao criar tarefa
 */
router.post("/", tarefaController.criarTarefa);

/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Obtém todas as tarefas de um usuário
 *     tags: [Tarefas]
 *     parameters:
 *       - in: query
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       400:
 *         description: Erro ao obter tarefas
 */
router.get("/", tarefaController.obterTarefas);

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar tarefa
 */
router.put("/:id", tarefaController.atualizarTarefa);

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       400:
 *         description: Erro ao deletar tarefa
 */
router.delete("/:id", tarefaController.deletarTarefa);

export default router;
