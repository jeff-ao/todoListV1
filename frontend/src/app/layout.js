"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Normaliza os estilos */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
