import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Define o modo claro como padrão
    primary: {
      main: "#1976d2", // Cor primária azul
    },
    secondary: {
      main: "#dc004e", // Cor secundária rosa
    },
    background: {
      default: "#f5f5f5", // Cor de fundo padrão (cinza claro)
      paper: "#ffffff", // Fundo de elementos como cartões
    },
    text: {
      primary: "#000000", // Texto preto
      secondary: "#555555", // Texto secundário
    },
  },
});

export default theme;
