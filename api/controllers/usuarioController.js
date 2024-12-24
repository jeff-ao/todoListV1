import usuarioService from "../services/usuarioService.js";

const usuarioController = {
  criarUsuario: async (req, res) => {
    const { body } = req;
    const novoUsuario = {
      nome: body.nome,
      email: body.email,
      senha: body.senha,
    };
    const resultado = await usuarioService.cadastrarUsuario(novoUsuario);
    if (resultado.erro) return res.status(400).json(resultado.erro); //cadastro deu errado

    res.status(201).send({ status: "OK", id: resultado.id }); //cadastro deu certo
  },
  logarUsuario: async (req, res) => {
    const { email, senha } = req.query;
    const resultado = await usuarioService.logarUsuario(email, senha);
    if (resultado.erro) return res.status(400).json(resultado); //login deu errado
    return res.status(200).json(resultado); //login deu certo
  },
};

export default usuarioController;
