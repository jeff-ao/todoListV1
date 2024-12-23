"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { createTask, fetchTasks } from "../../services/tarefaService";
import Notification from "../../components/Notification";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchTasks(userId)
        .then((data) => setTasks(data))
        .catch(() => {
          setNotification({
            open: true,
            message: "Erro ao carregar tarefas.",
            severity: "error",
          });
        });
    }
  }, [userId]);

  const handleCreateTask = async () => {
    if (!newTask.trim()) {
      setNotification({
        open: true,
        message: "Por favor, insira uma tarefa.",
        severity: "error",
      });
      return;
    }

    try {
      await createTask({ tarefa: newTask, usuario_id: userId });
      setNotification({
        open: true,
        message: "Tarefa criada com sucesso.",
        severity: "success",
      });
      setNewTask("");
      fetchTasks(userId).then((data) => setTasks(data)); // Recarrega a lista de tarefas
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
        <Typography variant="h4">Tarefas</Typography>
        <TextField
          label="Nova Tarefa"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          margin="normal"
        />
        <Box mt={2}>
          <Button variant="contained" onClick={handleCreateTask}>
            Criar Tarefa
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText primary={task.tarefa} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
