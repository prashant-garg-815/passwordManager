import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'
import sirv from 'sirv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-microapps',
      configureServer(server) {
        // Serve auth-ui dist directory
        server.middlewares.use(
          '/auth-ui',
          sirv(path.resolve(__dirname, '../../apps/auth-ui/dist'), { dev: true })
        )
        // Serve dashboard dist directory
        server.middlewares.use(
          '/dashboard',
          sirv(path.resolve(__dirname, '../../apps/dashboard/dist'), { dev: true })
        )
        // Serve user-profile dist directory
        server.middlewares.use(
          '/user-profile',
          sirv(path.resolve(__dirname, '../../apps/user-profile/dist'), { dev: true })
        )
      }
    },
    federation({
      name: 'shell',
      remotes: {
        auth_ui: '/auth-ui/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
