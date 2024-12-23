"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { loginUser } from "../services/usuarioService";
import Notification from "../components/Notification";

export default function Login() {
  const [sucessLogin, setSucessLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, senha);
      //localStorage.setItem("user", JSON.stringify(data)); // Armazena o usuário logado no localStorage
      setSucessLogin(true);
      setNomeUser(data.nome);
      setTimeout(() => router.push("/home"), 2000); // Redireciona para a página de Home
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
      {sucessLogin && <Alert severity="success">Bem-vindo, {nomeUser}!</Alert>}
      <Box textAlign="center" mt={8}>
        <Typography variant="h4">Login</Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)} //'e' representa o evento
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="outlined" onClick={() => router.push("/register")}>
            Criar nova conta
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
