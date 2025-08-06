import databaseConfig from "../database/databaseConfig.js";

const database = databaseConfig.getDatabase();

const Tarefa = {
  inserir: async (novaTarefa) => {
    const sql = `INSERT INTO tarefas (tarefa, usuario_id, categoria) VALUES ($1, $2, $3) RETURNING id`;
    const values = [
      novaTarefa.tarefa,
      novaTarefa.usuario_id,
      novaTarefa.categoria,
    ];

    const result = await database.query(sql, values);
    return result.rows[0];
  },

  deletar: async (id) => {
    await database.query(`DELETE FROM tarefas WHERE id = $1`, [id]);
    return { status: "Tarefa deletada com sucesso!" };
  },

  atualizar: async (id, tarefa, categoria) => {
    const sql = `UPDATE tarefas SET tarefa = $1, categoria = $2 WHERE id = $3`;
    await database.query(sql, [tarefa, categoria, id]);
    return { status: "Tarefa atualizada com sucesso!" };
  },

  obter: async (usuario_id) => {
    const sql = `SELECT * FROM tarefas WHERE usuario_id = $1`;
    const result = await database.query(sql, [usuario_id]);
    return result.rows;
  },

  obterPorId: async (id) => {
    const sql = `SELECT * FROM tarefas WHERE id = $1`;
    const result = await database.query(sql, [id]);
    return result.rows[0];
  },

  obterPorTexto: async (texto, usuarioId, categoria) => {
    const sql = `SELECT * FROM tarefas WHERE tarefa = $1 AND usuario_id = $2 AND categoria = $3`;
    const result = await database.query(sql, [texto, usuarioId, categoria]);
    return result.rows[0];
  },
};

export default Tarefa;
