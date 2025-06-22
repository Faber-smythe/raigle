import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
import tailwindcss from './node_modules/@tailwindcss/vite/dist/index.mjs'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      // injectManifest: {
      //   swSrc: 'sw.js',
      //   swDest: 'sw.js'
      // },
      manifest: {
        name: 'Raigle - saigneur du ciel',
        short_name: 'Raigle',
        description: 'A simple PWA for tracking menstruation cycles',
        theme_color: '#e91e63',
        background_color: '#030014',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
