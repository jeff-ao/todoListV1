import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import databaseConfig from "./database/databaseConfig.js";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Carrega as variáveis de ambiente do arquivo .env
// É importante que isso seja feito no início
dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Boa prática: usar porta do ambiente ou padrão

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "API para gereciamento de tarefas",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/usuarios", usuarioRoutes);
app.use("/tarefas", tarefaRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Função assíncrona para iniciar o servidor
const startServer = async () => {
  try {
    // 1. Inicia a conexão com o banco e cria as tabelas se não existirem
    await databaseConfig.startDatabase();

    // 2. Só depois que o banco estiver pronto, o servidor começa a ouvir
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port} 🔥`);
      console.log(
        `Documentação da API disponível em http://localhost:${port}/api-docs`
      );
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
    process.exit(1); // Encerra a aplicação se não conseguir conectar ao banco
  }
};

// Inicia a aplicação
startServer();
