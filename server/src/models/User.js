import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["tenant", "landlord", "admin"], default: "tenant" },
    name: { type: String, default: "User" },
    phone: { 
      type: String,
      default: "",
      match: [/^\+?[0-9]{7,15}$/, "Phone must contain only digits and an optional leading +"],
    },
    avatarUrl: { type: String, default: "https://via.placeholder.com/150"},
    currentProperty: {type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    subscriptionStatus: { type: String, enum: ["active", "inactive", "past due", "cancelled"], default: "inactive" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
