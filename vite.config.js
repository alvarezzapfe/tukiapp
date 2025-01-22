import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Importa el plugin de React
import path from "path";

export default defineConfig({
  plugins: [react()], // Agrega el plugin de React
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx"], // Asegúrate de incluir las extensiones
  },
});
