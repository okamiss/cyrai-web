import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'

import react from '@vitejs/plugin-react'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      UnoCSS({
        configFile: './uno.config.ts'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      // host: '0.0.0.0',
      // port: 8005,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
