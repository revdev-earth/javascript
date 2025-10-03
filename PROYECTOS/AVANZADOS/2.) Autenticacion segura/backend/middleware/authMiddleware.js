import { verifyAccessToken } from "../utils/tokens.js";

export function authenticateAccessToken(req, res, next) {
  // Access token via Authorization: Bearer <token> header
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "No authorization header" });
  const parts = auth.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ error: "Bad authorization header" });
  const token = parts[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid / expired access token" });
  }
}
