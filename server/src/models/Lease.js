import mongoose from "mongoose";

const leaseSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    unit: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    rentAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: true },
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
