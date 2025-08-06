import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Adicione esta linha para habilitar a conexão segura (SSL)
  ssl: {
    rejectUnauthorized: false,
  },
});

const databaseConfig = {
  startDatabase: async () => {
    try {
      // Testando a conexão para garantir que tudo está ok
      const client = await pool.connect();
      console.log("Conexão com o banco de dados estabelecida com sucesso! ✅");
      client.release();

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
      console.log("Tabelas verificadas/criadas. ✅");
    } catch (error) {
      console.error("❌ Erro ao iniciar o banco de dados:", error);
      throw error;
    }
  },
  getDatabase: () => pool,
};

export default databaseConfig;
