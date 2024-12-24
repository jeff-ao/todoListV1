import axios from "axios";

const API_URL = "http://localhost:3001"; // Substitua pela URL da sua API

// Função para criar uma tarefa
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tarefas`, taskData);
    return response.data; // Retorna o id da nova tarefa após criação
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar tarefa");
  }
};

// Função para obter todas as tarefas de um usuário
export const fetchTasks = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/tarefas`, {
      params: { usuario_id: userId },
    });
    return response.data; // Retorna a lista de tarefas
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao obter tarefas");
  }
};

// Função para deletar uma tarefa
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/tarefas/${taskId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao deletar tarefa");
  }
};

// Função para atualizar uma tarefa
export const updateTask = async (taskId, novoTexto) => {
  try {
    await axios.put(`${API_URL}/tarefas/${taskId}?texto=${novoTexto}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar tarefa"
    );
  }
};
