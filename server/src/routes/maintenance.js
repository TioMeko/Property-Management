import { Router } from "express";
import { MaintenanceRequest } from "../models/MaintenanceRequest.js";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// Tenant creates a new maintenance request
// POST /maintenance
router.post("/", authRequired, requireRole("tenant"), async (req, res, next) => {
  try {
    const tenantId = req.user.id;
    const { title, issueCategory, description, priority, permissionToEnter } = req.body;

    const ticket = await MaintenanceRequest.create({
      tenant: tenantId,
      title,
      issueCategory,
      description,
      priority,
      permissionToEnter
    });

    res.json({ id: ticket._id, status: ticket.status });
  } catch (err) {
    next(err);
  }
});

// Tenant view own requests
// GET /maintenance (tenant)
router.get("/", authRequired, async (req, res, next) => {
  try {
    const role = req.user.role;
    const tenantId = req.user.id;

    let query = {};
    if (role === "tenant") {
      query.tenant = tenantId;
    }

    const tickets = await MaintenanceRequest.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json(
      tickets.map(t => ({
        id: t._id,
        title: t.title,
        issueCategory: t.issueCategory,
        description: t.description,
        priority: t.priority,
        permissionToEnter: t.permissionToEnter,
        createdAt: t.createdAt,
        status: t.status
      }))
    );
  } catch (err) {
    next(err);
  }
});

// Admin updates status
// PATCH /maintenance/:id
router.patch(
  "/:id",
  authRequired,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const { status } = req.body;
      const allowed = ["pending", "in_progress", "completed", "cancelled"];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const ticket = await MaintenanceRequest.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.json({ id: ticket._id, status: ticket.status });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
