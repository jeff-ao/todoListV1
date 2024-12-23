"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { registerUser } from "../../services/usuarioService";
import Notification from "../../components/Notification";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const arePasswordsMatching = () => senha === confirmPassword;

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setNotification({
        open: true,
        message: "Por favor, insira um e-mail válido.",
        severity: "error",
      });
      return;
    }

    if (!arePasswordsMatching()) {
      setNotification({
        open: true,
        message: "As senhas não coincidem.",
        severity: "error",
      });
      return;
    }

    try {
      const data = await registerUser({ nome, email, senha });
      setNotification({
        open: true,
        message: "Cadastro realizado com sucesso! Faça login.",
        severity: "success",
      });
      setTimeout(() => router.push("/"), 2000); // Redireciona para a página de login
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="sm">
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
      <Box textAlign="center" mt={8}>
        <Typography variant="h4">Cadastro</Typography>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" onClick={handleRegister}>
            Cadastrar
          </Button>
          <Button variant="outlined" onClick={() => router.push("/")}>
            Já tem uma conta? Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
