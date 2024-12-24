import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";

const EditTaskModal = ({
  open,
  onClose,
  updatedTask,
  setUpdatedTask,
  handleEditTask,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTask();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          Atualizar Tarefa
        </Typography>
        <TextField
          label="Tarefa"
          fullWidth
          value={updatedTask?.tarefa || ""}
          onChange={(e) =>
            setUpdatedTask({ ...updatedTask, tarefa: e.target.value })
          }
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Atualizar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
