"use client";
import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Notification({ open, onClose, message, severity }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Fecha automaticamente após 3 segundos
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }} // Posição
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
