import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease" },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" }, 
    //Need to create an invoice model, (invoice number, line item array of objects)
    // title, description, amount)
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["unpaid", "paid", "pending", "overdue"],
      default: "unpaid"
    },
    method: {
      type: String,
      enum: ["ach", "card", "cash", "check"],
      default: "ach"
    }
  },
  { timestamps: true }
);

paymentSchema.statics.computeTotalsForTenant = async function (tenantId) {
  const payments = await this.find({ tenant: tenantId }).lean();
  let overdueAmount = 0;
  let upcomingAmount = 0;

  for (const p of payments) {
    if (p.status === "overdue") overdueAmount += p.amount;
    if (p.status === "pending") upcomingAmount += p.amount;
  }

  return {
    overdueAmount,
    upcomingAmount,
    totalDue: overdueAmount + upcomingAmount
  };
};

export const Payment = mongoose.model("Payment", paymentSchema);
