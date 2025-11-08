import { Router } from "express";
const router = Router();

const lease = {
  summary: { unit: "2B1B", startDate: "2025-08-01", endDate: "2026-07-31", rent: 1450, deposit: 1450 },
  termsUrl: "https://example.com/lease.pdf"
};

router.get("/", (_req, res) => res.json(lease));

export default router;
