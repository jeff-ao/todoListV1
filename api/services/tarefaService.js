import Tarefa from "../models/Tarefa.js";
import usuarioService from "./usuarioService.js";
import validator from "validator";

const tarefaService = {
  cadastrarTarefa: async (novaTarefa) => {
    if (!novaTarefa.tarefa || !novaTarefa.usuario_id)
      return { erro: "Envie todos os campos obrigatórios" };

    const usuario = await usuarioService.obterUsuario(novaTarefa.usuario_id);
    if (usuario.erro) return { erro: "Usuário não encontrado" };
    try {
      const resultado = await Tarefa.inserir(novaTarefa);
      if (resultado.erro) return { erro: "Erro ao inserir tarefa no banco" };
      return resultado;
    } catch (error) {
      return { erro: "Erro ao inserir tarefa no banco" };
    }
  },
  deletarTarefa: async (id) => {
    if (!id) return { erro: "Envie o id da tarefa" };

    const tarefaExistente = await Tarefa.obterPorId(id);
    if (!tarefaExistente) return { erro: "Tarefa não encontrada" };

    try {
      const resultado = await Tarefa.deletar(id);
      if (resultado.erro) return { erro: "Erro ao deletar tarefa no banco" };
      return resultado;
    } catch (error) {
      return { erro: "Erro ao deletar tarefa no banco" };
    }
  },
  atualizarTarefa: async (id, tarefa) => {
    if (!id) return { erro: "Envie o id da tarefa" };
    if (!tarefa) return { erro: "Envie o texto da tarefa" };

    const tarefaExistente = await Tarefa.obterPorId(id);
    if (!tarefaExistente) return { erro: "Tarefa não encontrada" };

    try {
      const resultado = await Tarefa.atualizar(id, tarefa);
      if (resultado.erro) return { erro: "Erro ao atualizar tarefa no banco" };
      return resultado;
    } catch (error) {
      return { erro: "Erro ao atualizar tarefa no banco" };
    }
  },
  obterTarefas: async (usuario_id) => {
    if (!usuario_id) return { erro: "Envie o id do usuário" };

    //validando se o Usuário existe
    const usuarioResultado = await usuarioService.obterUsuario(usuario_id);
    if (usuarioResultado.erro) return usuarioResultado;
    try {
      const resultado = await Tarefa.obter(usuario_id);
      if (resultado.erro) return { erro: "Erro ao obter tarefas no banco" };
      return resultado;
    } catch (error) {
      return { erro: "Erro ao obter tarefas no banco" };
    }
  },
};

export default tarefaService;
