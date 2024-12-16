import tarefaService from "../services/tarefaService.js";

const tarefaController = {
  criarTarefa: async (req, res) => {
    const { body } = req;
    const novaTarefa = {
      tarefa: body.tarefa,
      usuario_id: body.usuario_id,
    };
    const resultado = await tarefaService.cadastrarTarefa(novaTarefa);
    res.status(201).send({ status: "OK", id: resultado.id });
  },
  obterTarefas: async (req, res) => {
    const { usuario_id } = req.query;
    const resultado = await tarefaService.obterTarefas(usuario_id);
    if (resultado.erro) return res.status(400).json(resultado); //obter deu errado
    return res.status(200).json(resultado); //obter deu certo
  },
  deletarTarefa: async (req, res) => {
    const { id } = req.params;
    const resultado = await tarefaService.deletarTarefa(id);
    if (resultado.erro) return res.status(400).json(resultado); //deletar deu errado
    return res.status(200).send("Tarefa deletada com sucesso!"); //deletar deu certo
  },
  atualizarTarefa: async (req, res) => {
    const { id } = req.params;
    const { tarefa } = req.query;

    const resultado = await tarefaService.atualizarTarefa(id, tarefa);
    if (resultado.erro) return res.status(400).json(resultado); //atualizar deu errado
    return res.status(200).send("Tarefa atualizada com sucesso!"); //atualizar deu certo
  },
};

export default tarefaController;
