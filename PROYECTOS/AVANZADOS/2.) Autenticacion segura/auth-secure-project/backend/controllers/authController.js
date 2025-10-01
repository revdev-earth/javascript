import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens.js";
import { sanitizeBody } from "../middleware/validateInputs.js";

const router = express.Router();

// MOCK "DB" - usar DB real en producción
const users = new Map(); // username -> { id, username, passwordHash }
const refreshTokenStore = new Map(); // refreshToken => { userId, tokenId, expiresAt }

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // en producción true (HTTPS)
  sameSite: "lax",
  path: "/",
};

// helper to issue tokens
function createTokensForUser(user) {
  const payload = { userId: user.id, username: user.username };
  const accessToken = signAccessToken(payload);
  const tokenId = uuidv4();
  const refreshToken = signRefreshToken({ ...payload, tokenId });
  // store refresh token server side
  refreshTokenStore.set(tokenId, {
    userId: user.id,
    tokenId,
    issuedAt: Date.now(),
  });
  return { accessToken, refreshToken, tokenId };
}

// CSRF helper (double submit): we set a cookie with a CSRF secret (readable by JS)
function makeCsrfToken() {
  // simple random token
  return uuidv4();
}

// Register
router.post(
  "/register",
  sanitizeBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing fields" });
    if (users.has(username))
      return res.status(409).json({ error: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const id = uuidv4();
    users.set(username, { id, username, passwordHash: hash });
    return res.status(201).json({ message: "User created" });
  }
);

// Login
router.post(
  "/login",
  sanitizeBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = users.get(username);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const { accessToken, refreshToken } = createTokensForUser(user);

    // set refresh token in httpOnly cookie (cannot be read by JS)
    res.cookie("jid", refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // set csrf token cookie (readable by JS) for double submit
    const csrfToken = makeCsrfToken();
    res.cookie("csrf", csrfToken, { sameSite: "lax", secure: false });

    // return access token to client (client should keep in memory)
    res.json({
      accessToken,
      csrfToken,
      user: { username: user.username, id: user.id },
    });
  }
);

// Refresh endpoint: client calls with cookie "jid". Also sends X-CSRF-Token header to protect from CSRF.
router.post("/refresh", (req, res) => {
  try {
    const cookieToken = req.cookies.jid;
    const csrfHeader = req.get("x-csrf-token");
    const csrfCookie = req.cookies.csrf;
    if (!cookieToken)
      return res.status(401).json({ error: "No refresh token cookie" });
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return res.status(403).json({ error: "Invalid CSRF token" });
    }

    // verify token
    const payload = verifyRefreshToken(cookieToken);
    const { tokenId, userId, username } = payload;

    // Check stored refresh token exists and matches tokenId
    const stored = refreshTokenStore.get(tokenId);
    if (!stored || stored.userId !== userId) {
      return res.status(401).json({ error: "Refresh token not recognized" });
    }

    // Issue new access token (and optionally rotate refresh token)
    const accessToken = signAccessToken({ userId, username });

    // Optionally rotate refresh token (simple implementation: keep same refresh token expiry)
    // For demo we reuse same cookie; in prod rotate tokenId and cookie.

    res.json({ accessToken });
  } catch (err) {
    console.error("refresh err", err);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

// Logout: clear refresh cookie and remove token in store
router.post("/logout", (req, res) => {
  const cookieToken = req.cookies.jid;
  if (cookieToken) {
    try {
      const payload = verifyRefreshToken(cookieToken);
      if (payload && payload.tokenId) {
        refreshTokenStore.delete(payload.tokenId);
      }
    } catch (err) {
      // ignore
    }
  }
  res.clearCookie("jid", { path: "/" });
  res.clearCookie("csrf", { path: "/" });
  res.json({ ok: true });
});

export default router;
