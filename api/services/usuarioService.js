import validator from "validator";
import Usuario from "../models/Usuario.js";

const usuarioService = {
  cadastrarUsuario: async (novoUsuario) => {
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha)
      return { erro: "Envie todos os campos obrigatórios" };

    if (!validator.isEmail(novoUsuario.email))
      return { erro: "Email inválido" };

    if (
      novoUsuario.senha.length < 8 ||
      !validator.isStrongPassword(novoUsuario.senha, {
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return {
        erro: "A senha deve conter pelo menos 8 caracteres, incluindo ao menos uma letra maiúscula, uma letra minúscula, um número e um símbolo.",
      };
    }

    try {
      const usuarioExistente = await Usuario.obterPorEmail(novoUsuario.email);
      if (usuarioExistente) {
        return { erro: "Email já cadastrado" };
      }

      const resultado = await Usuario.inserir(novoUsuario);
      if (resultado.erro) return { erro: "Erro ao inserir usuário no banco" };
      return resultado;
    } catch (erro) {
      return { erro: "Erro ao inserir usuário no banco" };
    }
  },
  logarUsuario: async (email, senha) => {
    if (!email || !senha) return { erro: "Envie todos os campos obrigatórios" };
    if (!validator.isEmail(email)) return { erro: "Email inválido" }; //double check
    return await Usuario.logar(email, senha);
  },
  obterUsuario: async (id) => {
    if (!id) return { erro: "Envie o id do usuário" };
    const resultado = await Usuario.obter(id);
    return resultado;
  },
};

export default usuarioService;
