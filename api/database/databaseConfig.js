import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const databaseConfig = {
  startDatabase: async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id SERIAL PRIMARY KEY,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL
        )`
      );

      await pool.query(
        `CREATE TABLE IF NOT EXISTS tarefas (
          id SERIAL PRIMARY KEY,
          tarefa TEXT NOT NULL,
          categoria TEXT,
          usuario_id INTEGER NOT NULL,
          FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        )`
      );
      console.log("Banco de dados iniciado e tabelas verificadas/criadas. ✅");
    } catch (error) {
      console.error("Erro ao iniciar o banco de dados:", error);
      // Adicione esta linha para repassar o erro
      throw error;
    }
  },
  getDatabase: () => pool,
};

export default databaseConfig;
