import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  base: '/user-profile/',
  plugins: [
    react(),
    federation({
      name: 'user_profile',
      filename: 'remoteEntry.js',
      exposes: {
        './UserProfileApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
