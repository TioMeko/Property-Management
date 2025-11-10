import { Router } from "express";
import { Lease } from "../models/Lease.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = Router();

// GET /lease  -> current tenant active lease
router.get("/", authRequired, async (req, res, next) => {
  try {
    const tenantId = req.user.id;

    const lease = await Lease.findOne({
      tenant: tenantId,
      status: "active"
    }).lean();

    if (!lease) {
      return res.status(404).json({ message: "No active lease found" });
    }

    res.json({
      summary: {
        unit: lease.unit,
        startDate: lease.startDate,
        endDate: lease.endDate,
        rent: lease.rentAmount,
        deposit: lease.depositAmount,
        status: lease.status
      },
      termsUrl: lease.termsUrl
    });
  } catch (err) {
    next(err);
  }
});

export default router;
