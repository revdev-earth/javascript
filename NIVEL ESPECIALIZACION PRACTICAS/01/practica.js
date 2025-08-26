// ===============================
// EJERCICIOS API DESIGN & INTEGRATION
// ===============================

// 1. REST PRINCIPLES
// Enunciado: Crea un ejemplo sencillo de API REST con Express para gestionar usuarios.
// Reglas:
// - GET obtiene un usuario.
// - POST crea un usuario.
// - PUT actualiza un usuario.
// - DELETE elimina un usuario.

import express from "express";
const app = express();
app.use(express.json());

let users = [{ id: 123, name: "Ana" }];

// GET (leer usuario)
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST (crear usuario)
app.post("/api/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (actualizar usuario)
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name || user.name;
  res.json(user);
});

// DELETE (eliminar usuario)
app.delete("/api/users/:id", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.status(204).send();
});

// 2. GRAPHQL
// Enunciado: Realiza una consulta GraphQL para obtener datos de un usuario.
// Nota: Ejemplo usando Apollo Server (requiere instalación).
/*
import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User { id: ID!, name: String!, email: String! }
  type Query { user(id: ID!): User }
`;

const usersData = [{ id: "123", name: "Ana", email: "ana@email.com" }];

const resolvers = {
  Query: {
    user: (_, { id }) => usersData.find(u => u.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log("GraphQL ready at", url));
*/

// 3. API VERSIONING
// Enunciado: Crea dos versiones de la API de usuarios.
app.get("/api/v1/users", (req, res) => {
  res.json(users.map((u) => ({ id: u.id }))); // versión 1 solo id
});

app.get("/api/v2/users", (req, res) => {
  res.json(users); // versión 2 retorna todo
});

// 4. RATE LIMITING
// Enunciado: Protege la API limitando el número de solicitudes por minuto.
import rateLimit from "express-rate-limit";
const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
app.use(limiter);

// 5. AUTHENTICATION STRATEGIES
// Enunciado: Implementa autenticación con JWT.
import jwt from "jsonwebtoken";
const SECRET = "mi_secreto";

// Generar token
app.post("/api/login", (req, res) => {
  const { userId } = req.body;
  const token = jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware para verificar token
function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Token required" });

  try {
    req.user = jwt.verify(token.replace("Bearer ", ""), SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Ruta protegida
app.get("/api/secure", authenticate, (req, res) => {
  res.json({ message: `Hola usuario ${req.user.userId}` });
});

// 6. CACHING
// Enunciado: Configura cache con encabezados HTTP.
app.get("/api/data", (req, res) => {
  res.set("Cache-Control", "public, max-age=60"); // cache 60s
  res.json({ data: "Respuesta cacheada" });
});

// 7. ERROR HANDLING
// Enunciado: Implementa manejo estándar de errores en la API.
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", code: 404 });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error", code: 500 });
});

// 8. API DOCUMENTATION
// Enunciado: Documenta los endpoints usando OpenAPI/Swagger (ejemplo mínimo).
// Nota: normalmente se define en un archivo swagger.yaml o JSON.
/*
openapi: 3.0.0
info:
  title: Users API
  version: 1.0.0
paths:
  /api/users:
    get:
      summary: List all users
      responses:
        '200':
          description: A JSON array of users
*/

app.listen(3000, () => console.log("API corriendo en http://localhost:3000"));
