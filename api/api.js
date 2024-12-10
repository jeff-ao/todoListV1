import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import databaseConfig from "./database/databaseConfig.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);

databaseConfig.startDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
