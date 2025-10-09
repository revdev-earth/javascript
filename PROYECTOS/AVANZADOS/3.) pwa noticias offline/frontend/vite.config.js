import { defineConfig } from "vite"; // Importa la función defineConfig de Vite para configurar el proyecto.
import react from "@vitejs/plugin-react"; // Importa el plugin oficial de Vite para integrar React.
import { VitePWA } from "vite-plugin-pwa"; // Importa el plugin de Vite para convertir la app en una PWA (Progressive Web App).
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Define la configuración de Vite. La exportación es por defecto para usar esta configuración en el proyecto.
  plugins: [
    react(), // Inicializa el plugin React para Vite, lo que habilita soporte para JSX y características de React.
    tailwindcss(),

    VitePWA({
      // Configuración del plugin VitePWA para habilitar funcionalidades de Progressive Web App.
      registerType: "autoUpdate", // Indica que el service worker se debe registrar con la opción autoUpdate (actualización automática).

      workbox: {
        // Configuración de Workbox (librería interna para gestionar el caching).
        runtimeCaching: [
          {
            // Se define la estrategia de caché para las solicitudes a la API de noticias.
            urlPattern: ({ url }) => url.origin === "https://newsapi.org", // Filtra las solicitudes que provienen de https://newsapi.org (API de noticias).
            handler: "NetworkFirst", // La estrategia de caching es NetworkFirst: primero intenta la red, y si no está disponible, usa el caché.

            options: {
              // Opciones adicionales para configurar el comportamiento del caché.
              cacheName: "news-api-cache", // El nombre del caché donde se almacenarán las respuestas de la API de noticias.
              expiration: {
                // Configura cuándo expiran los artículos almacenados en caché.
                maxEntries: 50, // Limita el número de artículos almacenados en el caché a 50.
                maxAgeSeconds: 24 * 60 * 60, // Establece la expiración del caché a 24 horas (1 día).
              },
            },
          },
        ],
      },

      manifest: {
        // Configuración del manifiesto para la PWA, que es necesario para que la aplicación se pueda instalar en dispositivos móviles.
        name: "Noticias App", // El nombre completo de la aplicación.
        short_name: "Noticias", // El nombre corto de la aplicación, usado en lugares con espacio limitado.
        description: "Una app de noticias que funciona offline", // Descripción corta de la aplicación.
        theme_color: "#ffffff", // Color de tema de la aplicación (se usa en la barra de navegación en dispositivos móviles).

        icons: [
          {
            // Define los iconos de la aplicación para la PWA. Estos iconos se usan en la pantalla de inicio y otros lugares del sistema operativo.
            src: "/icon.png", // Ruta al icono.
            sizes: "192x192", // Tamaño del icono (192x192 píxeles).
            type: "image/png", // Tipo de archivo (PNG).
          },
          {
            src: "/icon.png", // Ruta al mismo icono (podría ser otro para diferentes tamaños).
            sizes: "512x512", // Tamaño del icono (512x512 píxeles, recomendado para dispositivos con pantallas de alta resolución).
            type: "image/png", // Tipo de archivo (PNG).
          },
        ],
      },
    }),
  ],
});
