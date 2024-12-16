import databaseConfig from "../database/databaseConfig.js";

const database = databaseConfig.getDatabase();

const Usuario = {
  inserir: (novoUsuario) => {
    return new Promise((resolve, reject) => {
      database.run(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
        [novoUsuario.nome, novoUsuario.email, novoUsuario.senha],
        function (error) {
          if (error) reject(error);
          else resolve({ id: this.lastID });
        }
      );
    });
  },
  logar: (email, senha) => {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM usuarios WHERE email = ? AND senha = ?`,
        [email, senha],
        function (error, rows) {
          if (error) reject({ erro: "Erro ao acessar o banco de dados" });
          else {
            if (rows.length === 0) resolve({ erro: "Usuário não encontrado" });
            else if (rows.length > 1)
              resolve({ erro: "Mais de um usuário encontrado" });
            else resolve(rows[0]);
          }
        }
      );
    });
  },
  obter: (id) => {
    return new Promise((resolve, reject) => {
      database.get(
        `SELECT * FROM usuarios WHERE id = ?`,
        [id],
        function (error, row) {
          if (error) reject(error);
          else if (!row) resolve({ erro: "Usuário não encontrado" });
          else resolve(row);
        }
      );
    });
  },
  obterPorEmail: (email) => {
    return new Promise((resolve, reject) => {
      database.get(
        `SELECT * FROM usuarios WHERE email = ?`,
        [email],
        function (error, row) {
          if (error) reject(error);
          else resolve(row);
        }
      );
    });
  },
};

export default Usuario;
