import axios from "axios";

const API_URL = "http://localhost:3001";

export const loginUser = async (email, senha) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/login`, {
      params: { email, senha },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao realizar login");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar conta");
  }
};
