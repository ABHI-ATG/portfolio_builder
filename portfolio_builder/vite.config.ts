import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is correctly set
  build: {
    outDir: "dist", // Ensure this matches the staticPublishPath in render.yaml
  }
})
