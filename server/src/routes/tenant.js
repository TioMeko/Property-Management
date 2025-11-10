import { Router } from "express";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";
import { Lease } from "../models/Lease.js";
import { Payment } from "../models/Payment.js";
import { Notice } from "../models/Notice.js";

const router = Router();

router.get("/summary", authRequired, requireRole("tenant"), async (req, res, next) => {
  try {
    const tenantId = req.user.id;

    const [lease, payments, notices] = await Promise.all([
      Lease.findOne({ tenant: tenantId, status: "active" }).lean(),
      Payment.find({ tenant: tenantId }).lean(),
      Notice.find({ active: true }).sort({ createdAt: -1 }).lean()
    ]);

    let overdueAmount = 0;
    let upcomingPayments = [];
    for (const p of payments) {
      if (p.status === "overdue") overdueAmount += p.amount;
      if (p.status === "pending") upcomingPayments.push(p);
    }

    let nextDueDate = null;
    let nextDueAmount = 0;
    if (upcomingPayments.length > 0) {
      upcomingPayments.sort((a, b) => new Date(a.date) - new Date(b.date));
      nextDueDate = upcomingPayments[0].date;
      nextDueAmount = upcomingPayments[0].amount;
    }

    const totalDue = overdueAmount + nextDueAmount;

    // Transform notices for frontend
    const formattedNotices = notices.map(n => ({
      id: n._id,
      title: n.title,
      body: n.body,
      startDate: n.startDate,
      endDate: n.endDate
    }));

    res.json({
      nextDueDate,
      nextDueAmount,
      overdueAmount,
      totalDue,
      notices: formattedNotices
    });
  } catch (err) {
    next(err);
  }
});

export default router;
