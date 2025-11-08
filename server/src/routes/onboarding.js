import { Router } from "express";
const router = Router();

let drafts = {}; // { userId: { step: N, data: {} } }

router.post("/", (req, res) => {
  const { userId = 1, stepCompleted = 1, data = {} } = req.body;
  drafts[userId] = { stepCompleted, data: { ...(drafts[userId]?.data || {}), ...data } };
  res.json({ draftId: userId, stepCompleted });
});

export default router;
