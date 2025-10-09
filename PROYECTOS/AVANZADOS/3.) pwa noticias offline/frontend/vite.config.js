import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePWA from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === "https://newsapi.org",
            handler: "NetworkFirst", // Prioriza la red pero usa el caché cuando no haya conexión
            options: {
              cacheName: "news-api-cache",
              expiration: {
                maxEntries: 50, // Límite de artículos en el caché
                maxAgeSeconds: 24 * 60 * 60, // El caché dura un día
              },
            },
          },
        ],
      },
      manifest: {
        name: "Noticias App",
        short_name: "Noticias",
        description: "Una app de noticias que funciona offline",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
