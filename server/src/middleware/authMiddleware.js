import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../models/User.js";

export async function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.id).lean();

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// For admin-only / tenant-only routes
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
