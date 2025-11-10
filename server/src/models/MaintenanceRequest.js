import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    issueType: { type: String, required: true }, // "Plumbing" | "Electrical" | etc
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenanceSchema);
