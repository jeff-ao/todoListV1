"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
} from "@/services/tarefaService.js";
import TaskTable from "@/components/TaskTable";
import TaskModal from "@/components/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ texto: "", categoria: "" });
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
      setUserId(storedUser?.id);
    }
  }, []);

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
    if (!task.texto.trim()) {
      setNotification({
        open: true,
        message: "Por favor, insira uma tarefa.",
        severity: "error",
      });
      return;
    }

    try {
      await createTask({
        tarefa: task.texto,
        categoria: task.categoria,
        usuario_id: userId,
      });
      setNotification({
        open: true,
        message: "Tarefa criada com sucesso.",
        severity: "success",
      });

      setTask({ texto: "", categoria: "" });
      setOpenTaskModal(false);
      fetchTasks(userId).then((data) => setTasks(data)); // Recarrega a lista de tarefas
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setNotification({
        open: true,
        message: "Tarefa deletada com sucesso.",
        severity: "success",
      });
      fetchTasks(userId).then((data) => setTasks(data)); // Recarrega a lista de tarefas
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleEditTask = (task) => {
    setTask(task);
    setIsEditMode(true);
    setOpenTaskModal(true);
  };

  const handleUpdateTask = async () => {
    if (!task.texto.trim()) {
      setNotification({
        open: true,
        message: "Por favor, insira uma tarefa.",
        severity: "error",
      });
      return;
    }

    try {
      await updateTask(task.id, {
        texto: task.texto,
        categoria: task.categoria,
      });
      setNotification({
        open: true,
        message: "Tarefa atualizada com sucesso.",
        severity: "success",
      });

      setTask({ texto: "", categoria: "" });
      setIsEditMode(false);
      setOpenTaskModal(false);
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
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Box textAlign="center" mt={8}>
        <Typography variant="h4">Bem-vindo, {user?.nome}</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setIsEditMode(false);
            setOpenTaskModal(true);
          }}
          style={{ marginTop: "20px" }}
        >
          Adicionar Nova Tarefa
        </Button>

        <TaskTable
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <TaskModal
          open={openTaskModal}
          onClose={() => setOpenTaskModal(false)}
          task={task}
          setTask={setTask}
          handleSubmit={isEditMode ? handleUpdateTask : handleCreateTask}
          isEditMode={isEditMode}
        />
      </Box>
    </Container>
  );
}
