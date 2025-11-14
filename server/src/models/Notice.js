import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    active: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null } // optional expiry
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", noticeSchema);

// MVP to be expanded on to full notification system
