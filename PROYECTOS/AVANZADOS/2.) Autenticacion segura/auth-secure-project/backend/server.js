import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./controllers/authController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS: permitir frontend, permitir cookies
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

// Ejemplo de ruta protegida
import { authenticateAccessToken } from "./middleware/authMiddleware.js";
app.get("/protected", authenticateAccessToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}. This is protected.` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth server listening on ${PORT}`));
