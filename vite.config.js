import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Opciones globales para SCSS (si aplica)
        additionalData: `@import "./src/assets/styles/variables.scss";`,
      },
    },
  },
  base: "/", // Ajusta esto si despliegas en un subdirectorio
});
