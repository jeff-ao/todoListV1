import databaseConfig from "../database/databaseConfig.js";

const database = databaseConfig.getDatabase();

const Tarefa = {
  inserir: (novaTarefa) => {
    return new Promise((resolve, reject) => {
      database.run(
        `INSERT INTO tarefas (tarefa, usuario_id) VALUES (?, ?)`,
        [novaTarefa.tarefa, novaTarefa.usuario_id],
        function (error) {
          if (error) reject(error);
          else resolve({ id: this.lastID });
        }
      );
    });
  },
  deletar: (id) => {
    return new Promise((resolve, reject) => {
      database.run(`DELETE FROM tarefas WHERE id = ?`, [id], function (error) {
        if (error) reject(error);
        else resolve({ status: "Tarefa deletada com sucesso!" });
      });
    });
  },
  atualizar: (id, tarefa) => {
    return new Promise((resolve, reject) => {
      database.run(
        `UPDATE tarefas SET tarefa = ? WHERE id = ?`,
        [tarefa, id],
        function (error) {
          if (error) reject(error);
          else resolve({ status: "Tarefa atualizada com sucesso!" });
        }
      );
    });
  },
  obter: (usuario_id) => {
    return new Promise((resolve, reject) => {
      database.all(
        `SELECT * FROM tarefas WHERE usuario_id = ?`,
        [usuario_id],
        function (error, rows) {
          if (error) reject(error);
          else resolve(rows);
        }
      );
    });
  },
  obterPorId: (id) => {
    return new Promise((resolve, reject) => {
      database.get(
        `SELECT * FROM tarefas WHERE id = ?`,
        [id],
        function (error, row) {
          if (error) reject(error);
          else resolve(row);
        }
      );
    });
  },
};

export default Tarefa;
