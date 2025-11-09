import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const router = Router();
const users = [];

router.post("/register", async (req, res) => {
  const { email, password, role = "tenant", name = "Tenant" } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hash, role, name };
  users.push(user);
  res.json({ success: true });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, config.jwtSecret, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, role: user.role, name: user.name } });
});

export default router;
