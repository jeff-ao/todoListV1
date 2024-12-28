import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";

const TaskModal = ({
  open,
  onClose,
  task,
  setTask,
  handleSubmit,
  isEditMode,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {isEditMode ? "Atualizar Tarefa" : "Nova Tarefa"}
        </Typography>
        <TextField
          label="Tarefa"
          fullWidth
          value={task?.texto || ""}
          onChange={(e) => setTask({ ...task, texto: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Categoria"
          fullWidth
          value={task?.categoria || ""}
          onChange={(e) => setTask({ ...task, categoria: e.target.value })}
          margin="normal"
        />
        <Button type="submit" variant="contained">
          {isEditMode ? "Atualizar" : "Criar"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
