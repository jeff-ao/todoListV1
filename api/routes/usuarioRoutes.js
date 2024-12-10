import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/", usuarioController.criarUsuario); // "/usuarios"
router.get("/login", usuarioController.logarUsuario); // "/usuarios/login"

export default router;
