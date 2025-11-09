import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease" },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending"
    },
    method: {
      type: String,
      enum: ["ach", "card", "cash", "other"],
      default: "other"
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
