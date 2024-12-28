import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const [filter, setFilter] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.categoria.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <TextField
          label="Filtrar por Categoria"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                Tarefa
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                Categoria
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginLeft: 1 }}
                >
                  Ações
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.tarefa}</TableCell>
              <TableCell>{task.categoria}</TableCell>
              <TableCell align="right">
                <Box display="flex" justifyContent="flex-end">
                  <Divider orientation="vertical" flexItem />
                  <IconButton onClick={() => onEdit(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
