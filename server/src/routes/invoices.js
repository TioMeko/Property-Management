import { Router } from "express";
import { authRequired, requireRole } from "../middleware/authMiddleware.js";
import { Invoice } from "../models/Invoice.js";

const router = Router();

function serializeInvoice(invoice) {
  const doc = invoice.toObject({ getters: true, virtuals: false });

  return {
    id: doc._id,
    invoiceNumber: doc.invoiceNumber,
    tenant: doc.tenant,
    lease: doc.lease,
    issueDate: doc.issueDate,
    dueDate: doc.dueDate,
    status: doc.status,
    notes: doc.notes,
    lineItems: doc.lineItems,
    totalAmount: invoice.getTotalAmount()
  };
}

router.get("/", authRequired, async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { tenant: req.user.id };
    const invoices = await Invoice.find(filter).sort({ dueDate: 1 });
    res.json(invoices.map(serializeInvoice));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", authRequired, async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (req.user.role !== "admin" && invoice.tenant.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(serializeInvoice(invoice));
  } catch (err) {
    next(err);
  }
});

router.post("/", authRequired, requireRole("admin"), async (req, res, next) => {
  try {
    const {
      invoiceNumber,
      tenantId,
      leaseId,
      issueDate,
      dueDate,
      status,
      notes,
      lineItems
    } = req.body;

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ message: "Invoice requires at least one line item" });
    }

    const invoice = await Invoice.create({
      invoiceNumber,
      tenant: tenantId,
      lease: leaseId,
      issueDate,
      dueDate,
      status,
      notes,
      lineItems
    });

    res.status(201).json(serializeInvoice(invoice));
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id/status",
  authRequired,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const invoice = await Invoice.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }

      res.json(serializeInvoice(invoice));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
