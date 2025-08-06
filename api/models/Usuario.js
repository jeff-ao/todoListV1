import databaseConfig from "../database/databaseConfig.js";

// O 'database' agora é o nosso pool de conexões
const database = databaseConfig.getDatabase();

const Usuario = {
  inserir: async (novoUsuario) => {
    // Usando a cláusula RETURNING para obter o ID do usuário inserido
    const sql = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id`;
    const values = [novoUsuario.nome, novoUsuario.email, novoUsuario.senha];

    // O pg usa $1, $2, ... como placeholders
    const result = await database.query(sql, values);
    return result.rows[0]; // Retorna { id: ... }
  },

  logar: async (email, senha) => {
    const sql = `SELECT * FROM usuarios WHERE email = $1 AND senha = $2`;
    const result = await database.query(sql, [email, senha]);

    // a consulta retorna um array de linhas (rows)
    if (result.rows.length === 0) {
      return { erro: "Usuário não encontrado" };
    }
    return result.rows[0]; // Retorna o primeiro usuário encontrado
  },

  obter: async (id) => {
    const sql = `SELECT * FROM usuarios WHERE id = $1`;
    const result = await database.query(sql, [id]);
    return result.rows[0] || { erro: "Usuário não encontrado" };
  },

  obterPorEmail: async (email) => {
    const sql = `SELECT * FROM usuarios WHERE email = $1`;
    const result = await database.query(sql, [email]);
    return result.rows[0]; // Retorna o usuário ou undefined
  },
};

export default Usuario;
