import { Router } from "express";
import { OnboardingDraft } from "../models/OnboardingDraft.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

// POST /onboarding  (multi-step save)
router.post("/", authRequired, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { stepCompleted, data } = req.body;

    const draft = await OnboardingDraft.upsertForUser({
      userId,
      stepCompleted,
      stepData: data || {}
    });

    res.json({ draftId: draft._id, stepCompleted: draft.stepCompleted });
  } catch (err) {
    next(err);
  }
});

export default router;
