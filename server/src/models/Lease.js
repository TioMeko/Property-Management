import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    unit: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
    leaseType: { type: String, enum: ["fixed", "month_to_month"], default: "fixed" },
    paymentDueDay: { type: Number, required: true }, // Day of month (1-31)
    gracePeriod: { type: Number, default: 9 }, // Number of days after payment due date to consider overdue 0-30
    status: {
      type: String,
      enum: ["active", "pending", "ended"],
      default: "active"
    },
    termsUrl: { type: String }
  },
  { timestamps: true }
);

leaseSchema.methods.toSummary = function () {
  return {
    unit: this.unit,
    startDate: this.startDate,
    endDate: this.endDate,
    rent: this.rentAmount,
    deposit: this.depositAmount,
    status: this.status
  };
};

export const Lease = mongoose.model("Lease", leaseSchema);
