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
import NewTaskModal from "@/components/NewTaskModal";
import EditTaskModal from "@/components/EditTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState(null);
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const fetchUserTasks = async () => {
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (error) {
      setNotification({
        open: true,
        message: "Erro ao carregar tarefas.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (userId) fetchUserTasks();
  }, [userId]); //para ao renderizar o componente, puxar as tarefas do backend

  const handleCreateTask = async () => {
    const newTaskCleaned = newTask.trim();
    if (!newTaskCleaned) {
      // Verifica se a tarefa está vazia ou é undefined
      setNotification({
        open: true,
        message: "Por favor, insira uma tarefa.",
        severity: "error",
      });
      return;
    }

    try {
      await createTask({ tarefa: newTaskCleaned, usuario_id: userId });
      setNotification({
        open: true,
        message: "Tarefa criada com sucesso.",
        severity: "success",
      });

      setNewTask("");
      setOpenNewTaskModal(false);
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
    setUpdatedTask(task);
    setOpenEditTaskModal(true);
  };

  const handleUpdateTask = async () => {
    if (!updatedTask || !updatedTask.tarefa.trim()) {
      setNotification({
        open: true,
        message: "Por favor, insira uma tarefa.",
        severity: "error",
      });
      return;
    }

    try {
      await updateTask(updatedTask.id, updatedTask.tarefa);
      setNotification({
        open: true,
        message: "Tarefa atualizada com sucesso.",
        severity: "success",
      });

      setUpdatedTask(null);
      setOpenEditTaskModal(false);
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
          onClick={() => setOpenNewTaskModal(true)}
          style={{ marginTop: "20px" }}
        >
          Adicionar Nova Tarefa
        </Button>

        {tasks.length > 0 ? (
          <TaskTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ) : (
          <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
            onClose={handleCloseNotification}
          >
            <Alert severity="info" onClose={handleCloseNotification}>
              Adicione uma tarefa para iniciar
            </Alert>
          </Snackbar>
        )}

        <NewTaskModal
          open={openNewTaskModal}
          onClose={() => setOpenNewTaskModal(false)}
          newTask={newTask}
          setNewTask={setNewTask}
          handleCreateTask={handleCreateTask}
        />

        <EditTaskModal
          open={openEditTaskModal}
          onClose={() => setOpenEditTaskModal(false)}
          updatedTask={updatedTask}
          setUpdatedTask={setUpdatedTask}
          handleEditTask={handleUpdateTask}
        />
      </Box>
    </Container>
  );
}
