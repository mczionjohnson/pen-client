import http from "https";

// import dotenv from 'dotenv';
// dotenv.config();

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const PORT = 5000 || process.env.PORT

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/proxy": {
        // target: "https://pen.hostless.app/",
        target: "http://localhost:8000/",
        changeOrigin: true,
        // secure: false,
        // agent: new http.Agent(),
        rewrite: (path) => path.replace(/^\/proxy/, '')
      },
    },
  }
})




