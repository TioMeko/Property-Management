import { Router } from "express";
import { Payment } from "../models/Payment.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

// GET /payments  -> current tenant payments
router.get("/", authRequired, async (req, res, next) => {
  try {
    const tenantId = req.user.id;

    const payments = await Payment.find({ tenant: tenantId })
      .sort({ date: -1 })
      .lean();

    res.json(
      payments.map(p => ({
        id: p._id,
        date: p.date,
        amount: p.amount,
        status: p.status
      }))
    );
  } catch (err) {
    next(err);
  }
});

export default router;
