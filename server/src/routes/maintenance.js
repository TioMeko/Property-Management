import { Router } from "express";
const router = Router();

let tickets = []; // {id, issueType, description, createdAt, status}

router.post("/", (req, res) => {
  const { issueType, description } = req.body;
  const t = { id: tickets.length + 1, issueType, description, createdAt: new Date().toISOString(), status: "pending" };
  tickets.push(t);
  res.json({ id: t.id, status: t.status });
});

router.get("/", (req, res) => {
  const role = req.query.role || "tenant";
  // for MVP we ignore role and return all
  res.json(tickets);
});

export default router;
