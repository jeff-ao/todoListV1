"use client";
import { useState } from "react";
import axios from "axios";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

export default function TaskModal({ onClose, userId, onTaskCreated }) {
  const [title, setTitle] = useState("");

  const handleCreateTask = async () => {
    try {
      const response = await axios.post("/api/tasks", {
        title,
        userId,
      });
      if (response.status === 201) {
        onTaskCreated(response.data);
        alert("Tarefa criada com sucesso!");
        onClose();
      }
    } catch (error) {
      alert("Erro ao criar tarefa.");
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          width: 400,
          p: 4,
          margin: "10% auto",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" mb={2}>
          Nova Tarefa
        </Typography>
        <TextField
          label="Título"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ marginRight: 1 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCreateTask}>
            Criar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
