import sqlite3 from "sqlite3";
const database = new sqlite3.Database("database.db");

const databaseConfig = {
  startDatabase: () => {
    database.run(
      `CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    senha TEXT NOT NULL
  )`
    );

    database.run(
      `CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tarefa TEXT NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
  )`
    );

    //database.run(`ALTER TABLE tarefas ADD COLUMN categoria TEXT`);
  },
  getDatabase: () => database,
};

export default databaseConfig;
