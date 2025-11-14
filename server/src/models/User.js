import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["tenant", "landlord", "admin"], default: "tenant" },
    name: { type: String, default: "User" }
    // avatarUrl: { type: String, default: "https://via.placeholder.com/150" },
    // phone: { type: String, default: "" }, will need validation
    // currentProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    // avatarUrl: { type: String, default: "https://via.placeholder.com/150" },
    // subscriptionStatus: { type: String, enum: ["active", "inactive", "past due", "cancelled"], default: "inactive" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
