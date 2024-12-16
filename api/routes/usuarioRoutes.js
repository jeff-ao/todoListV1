import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
router.post("/", usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   get:
 *     summary: Loga um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: senha
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Erro ao logar usuário
 */
router.get("/login", usuarioController.logarUsuario);

export default router;
