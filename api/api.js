const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const validator = require("validator");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const database = new sqlite3.Database("database.db");

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

app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body; // { nome: "Fulano", email: "fulano@gmail", senha: "123456"}

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ error: "Envie todos os campos obrigatórios" });
  }

  if (
    senha.length < 8 ||
    !validator.isStrongPassword(senha, {
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      error:
        "A senha deve conter pelo menos 8 caracteres, incluindo ao menos uma letra maiúscula, uma letra minúscula e um número.",
    });
  }

  database.run(
    `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senha],
    function (error) {
      if (error)
        return res.status(500).json({ error: "Erro ao inserir usuário" });
      return res.status(201).json({ id: this.lastID, nome, email, senha });
    }
  );
});

app.get("/usuarios/login", (req, res) => {
  const { email, senha } = req.body; // { email: "fulano@gmail", senha: "123456"}
  database.all(
    `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
    [email, senha],
    function (error, rows) {
      if (error)
        return res
          .status(500)
          .json({ error: "Erro ao acessar o banco de dados" });
      else if (rows.length === 0)
        return res.status(404).json({ error: "Usuário não encontrado" });
      else if (rows.length > 1)
        return res.status(500).json({ error: "Mais de um usuário encontrado" });
      else return res.status(200).json(rows[0]);
    }
  );
});

app.get("/tarefas", (req, res) => {
  const { usuario_id } = req.query;
  database.get(
    `SELECT * FROM usuarios WHERE id = ?`,
    [usuario_id],
    (error, row) => {
      if (error) {
        return res.status(500).json({ error: "Erro interno" });
      }
      if (!row) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      database.all(
        `SELECT * FROM tarefas WHERE usuario_id = ?`,
        [usuario_id],
        (error, rows) => {
          if (error) {
            return res
              .status(500)
              .json({ error: "Erro ao acessar o banco de dados" });
          }
          return res.status(200).json(rows);
        }
      );
    }
  );
});

app.post("/tarefas", (req, res) => {
  const { tarefa, usuario_id } = req.body; // { tarefa: "Estudar", usuario_id: 1}

  database.get(
    `SELECT * FROM usuarios WHERE id = ?`,
    [usuario_id],
    (error, row) => {
      if (error) {
        return res.status(500).json({ error: "Erro interno" });
      }
      if (!row) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      database.run(
        `INSERT INTO tarefas (tarefa, usuario_id) VALUES (?, ?)`,
        [tarefa, usuario_id],
        function (error) {
          if (error) {
            return res.status(500).json({ error: "Erro ao inserir tarefa" });
          }
          return res.status(201).json({ id: this.lastID, tarefa, usuario_id });
        }
      );
    }
  );
});

app.delete("/tarefas/:id", (req, res) => {
  const tarefaId = req.params.id;
  database.run(
    `DELETE FROM tarefas WHERE id = ?`,
    [tarefaId],
    function (error) {
      if (error)
        return res.status(500).json({ error: "Erro ao deletar tarefa" });
      return res.status(200).send("Tarefa deletada com sucesso!");
    }
  );
});

app.put("/tarefas/:id", (req, res) => {
  const tarefaId = req.params.id;
  const { tarefa } = req.body; // { tarefa: "Estudar"}
  database.run(
    `UPDATE tarefas SET tarefa = ? WHERE id = ?`,
    [tarefa, tarefaId],
    function (error) {
      if (error)
        return res.status(500).json({ error: "Erro ao atualizar tarefa" });
      return res.status(200).send("Tarefa atualizada com sucesso!");
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
