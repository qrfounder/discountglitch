import jwt from "jsonwebtoken";

const SECRET =
  process.env.MOJO_SECRET || process.env.MOJO_PASSWORD || "change-me-in-production";

export function signToken() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

export function checkPassword(password) {
  const expected = process.env.MOJO_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
