// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true, // Permite acesso de qualquer host (incluindo ngrok)
    port: 4321
  },
  vite: {
    server: {
      host: '0.0.0.0', // Escuta em todas as interfaces
      strictPort: false,
      allowedHosts: [
        '.ngrok-free.app',
        '.ngrok.io',
        '.ngrok.app'
      ],
      cors: {
        origin: '*', // Permite todas as origens
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
      },
      hmr: {
        clientPort: 443 // Para ngrok com HTTPS
      }
    }
  }
});
