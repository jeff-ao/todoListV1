import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";

const NewTaskModal = ({
  open,
  onClose,
  newTask,
  setNewTask,
  handleCreateTask,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTask();
      }}
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
        Nova Tarefa
      </Typography>
      <TextField
        label="Tarefa"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        margin="normal"
      />
      <Button type="submit" variant="contained">
        Criar
      </Button>
    </Box>
  </Modal>
);

export default NewTaskModal;
