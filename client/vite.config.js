import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '64.23.243.67',
    port: 3001, 
  },
});

// local 10.0.60.118
//server 64.23.243.67