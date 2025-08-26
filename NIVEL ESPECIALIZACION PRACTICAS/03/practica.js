/**
 * ================================
 * 3. Node.js Backend Integration
 * ================================
 * Aprender a integrar Node.js en entornos backend implica entender:
 * - Sus diferencias como runtime
 * - Desarrollar APIs
 * - Conectarse a bases de datos
 * - Implementar autenticación
 * - Usar middleware
 * - Escalar la aplicación
 */

/**
 * 1. Runtime Differences
 * ----------------------
 * Node.js usa V8 y un event loop no bloqueante.
 * Es single-threaded con I/O asíncrono.
 * Ideal para apps en tiempo real y APIs con muchas conexiones.
 */

console.log("=== Ejercicio 1: Runtime Differences ===");
console.log("Inicio");
setTimeout(() => console.log("Tarea asíncrona"), 0);
console.log("Fin");
// Salida esperada:
// Inicio
// Fin
// Tarea asíncrona

/**
 * 2. Server-Side Rendering (SSR)
 * ------------------------------
 * Renderizar HTML desde el servidor para mejorar SEO y rendimiento.
 * Ejemplo con Next.js (simplificado).
 */

console.log("\n=== Ejercicio 2: SSR (Next.js) ===");
export async function getServerSideProps() {
  return { props: { time: new Date().toISOString() } };
}
// Al ejecutar en un proyecto Next.js, devuelve props con la fecha actual.

/**
 * 3. API Development
 * ------------------
 * Crear APIs REST con Express.
 */

console.log("\n=== Ejercicio 3: API Development (Express) ===");
import express from "express";
const app = express();

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde el backend" });
});

app.listen(3000, () =>
  console.log("Servidor API corriendo en http://localhost:3000")
);

/**
 * 4. Database Integration
 * -----------------------
 * Conectar Node.js a bases de datos SQL o NoSQL.
 */

console.log("\n=== Ejercicio 4: Database Integration ===");

// MongoDB con Mongoose
import mongoose from "mongoose";
async function mongoExample() {
  await mongoose.connect("mongodb://localhost:27017/miapp");
  const Usuario = mongoose.model("Usuario", { nombre: String });
  await Usuario.create({ nombre: "Nico" });
  console.log("Usuario creado en MongoDB");
}
// mongoExample();

// PostgreSQL con node-postgres
import { Client } from "pg";
async function postgresExample() {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT NOW()");
  console.log("Hora en PostgreSQL:", res.rows);
}
// postgresExample();

/**
 * 5. Authentication
 * -----------------
 * Autenticación con JWT (JSON Web Token).
 */

console.log("\n=== Ejercicio 5: Authentication (JWT) ===");
import jwt from "jsonwebtoken";
const token = jwt.sign({ userId: 1 }, "secreto", { expiresIn: "1h" });
const datos = jwt.verify(token, "secreto");
console.log("Token JWT:", token);
console.log("Datos decodificados:", datos);

/**
 * 6. Middleware
 * -------------
 * Funciones que interceptan peticiones antes de llegar al controlador.
 */

console.log("\n=== Ejercicio 6: Middleware (Express) ===");
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);

/**
 * 7. Scaling
 * ----------
 * Node.js puede escalar horizontalmente usando clustering.
 */

console.log("\n=== Ejercicio 7: Scaling con Cluster ===");
import cluster from "cluster";
import os from "os";

if (cluster.isPrimary) {
  os.cpus().forEach(() => cluster.fork());
  console.log(`Master ${process.pid} ejecutando`);
} else {
  app.listen(3000, () => console.log(`Worker ${process.pid} corriendo`));
}

/**
 * 8. Microservices
 * ----------------
 * Backend dividido en servicios pequeños que se comunican vía HTTP o mensajería.
 * Ejemplo básico de microservicio en Express.
 */

console.log("\n=== Ejercicio 8: Microservices ===");
const microService = express();
microService.get("/users", (req, res) => {
  res.json([
    { id: 1, nombre: "Nico" },
    { id: 2, nombre: "Ana" },
  ]);
});
microService.listen(4000, () =>
  console.log("Microservicio corriendo en http://localhost:4000/users")
);
