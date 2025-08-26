/**
 * ============================
 * 🌍 Real-World Deployment y DevOps
 * ============================
 *
 * Objetivo: Aprender a preparar, desplegar y mantener aplicaciones Node.js
 * en producción de forma profesional, segura y escalable.
 */

/* =========================================================
 1. Bundling Strategies
 Enunciado: Configura Webpack para optimizar el código de tu aplicación 
 usando minificación, code splitting y tree shaking.
 ========================================================= */
// Solución (webpack.config.js simulado en JS)
const webpackConfig = {
  mode: "production",
  optimization: {
    splitChunks: { chunks: "all" }, // Code splitting
    usedExports: true, // Tree shaking
    minimize: true, // Minificación
  },
};
console.log("✅ Bundling configurado:", webpackConfig);

/* =========================================================
 2. Environment Configuration
 Enunciado: Usa variables de entorno para separar configuraciones de desarrollo y producción.
 ========================================================= */
import dotenv from "dotenv";
dotenv.config();
console.log("🌐 API_URL:", process.env.API_URL || "http://localhost:3000");

/* =========================================================
 3. CDN Optimization
 Enunciado: Usa un CDN para servir archivos estáticos más rápido.
 ========================================================= */
// Solución (ejemplo de script que podrías usar en frontend)
const cdnExample = `<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>`;
console.log("⚡ CDN Example:", cdnExample);

/* =========================================================
 4. Monitoring
 Enunciado: Implementa un endpoint `/health` en tu app Express
 para comprobar que el servidor está activo.
 ========================================================= */
import express from "express";
const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* =========================================================
 5. Logging
 Enunciado: Configura un sistema de logging con Winston para registrar eventos importantes.
 ========================================================= */
import winston from "winston";
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});
logger.info("📜 Servidor iniciado con Winston");

/* =========================================================
 6. Error Tracking
 Enunciado: Configura Sentry para capturar errores en producción.
 ========================================================= */
import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://dummy-dsn@sentry.io/123",
});
app.use(Sentry.Handlers.errorHandler());

/* =========================================================
 7. Analytics Integration
 Enunciado: Integra Google Analytics para medir el uso de la app.
 ========================================================= */
// Solución (fragmento HTML como string)
const analyticsSnippet = `
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX"></script>
<script>
  gtag("js", new Date());
  gtag("config", "UA-XXXXXX");
</script>
`;
console.log("📊 Google Analytics snippet:", analyticsSnippet);

/* =========================================================
 8. CI/CD Pipelines
 Enunciado: Configura un pipeline de despliegue automático con GitHub Actions.
 ========================================================= */
// Solución (workflow como string)
const githubActionsExample = `
name: Deploy
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build
`;
console.log("🤖 CI/CD ejemplo:", githubActionsExample);

/* =========================================================
 9. Containerization
 Enunciado: Usa Docker para empaquetar la aplicación con sus dependencias.
 ========================================================= */
// Solución (Dockerfile como string)
const dockerfileExample = `
FROM node:20
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`;
console.log("🐳 Dockerfile ejemplo:", dockerfileExample);

// Inicializar servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Servidor escuchando en http://localhost:\${PORT}`);
});
