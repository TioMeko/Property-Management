import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { User } from "../models/User.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

function createToken(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role, name: user.name },
    config.jwtSecret,
    { expiresIn: "1d" }
  );
}

// POST /auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, role = "tenant", name } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      role,
      name
    });

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me  -> validates token + returns session user
router.get("/me", authRequired, (req, res) => {
  res.json({ user: req.user });
});

// POST /auth/forgot-password  (MVP stub)
router.post("/forgot-password", async (req, res, _next) => {
  const { email } = req.body;

  // MVP: do NOT reveal whether email exists. Just respond OK.
  // Later you can implement: create reset token, store on user, send email.
  console.log("Password reset requested for:", email);

  res.json({
    message:
      "If an account with that email exists, you will receive password reset instructions."
  });
});


// POST /auth/logout
// Need to create a logout route


export default router;
