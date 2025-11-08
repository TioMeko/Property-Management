import { Router } from "express";
const router = Router();

const payments = [
  { id: 1, date: "2025-10-01", amount: 1450, status: "paid" },
  { id: 2, date: "2025-11-01", amount: 1450, status: "pending" }
];

router.get("/", (_req, res) => res.json(payments));

export default router;
