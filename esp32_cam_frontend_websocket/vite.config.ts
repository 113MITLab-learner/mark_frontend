import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // 1. 先載入 .env 檔案
  const env = loadEnv(mode, process.cwd())

  // 2. 再看有沒有 Docker run 傳入的 process.env.VITE_PORT
  //    如果都沒有，預設 5173
  const portFromEnvFile = env.VITE_PORT
  const portFromProcess = process.env.VITE_PORT
  const finalPort = portFromProcess || portFromEnvFile || '5173'

  return {
    plugins: [react()],
    server: {
      host: true,
      port: parseInt(finalPort, 10),
    },
  }
})