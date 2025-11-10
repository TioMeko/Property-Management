import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["tenant", "admin"], default: "tenant" },
    name: { type: String, default: "User" }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
