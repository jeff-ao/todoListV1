import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskTable = ({ tasks, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ marginTop: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="body1" fontWeight="bold">
              Tarefa
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
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.tarefa}</TableCell>
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

export default TaskTable;
