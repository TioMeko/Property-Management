import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    amount: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lease: { type: mongoose.Schema.Types.ObjectId, ref: "Lease" },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "sent", "partial", "paid", "void"],
      default: "draft"
    },
    notes: { type: String, default: "" },
    lineItems: {
      type: [lineItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "Invoice requires at least one line item."
      }
    }
  },
  { timestamps: true }
);

invoiceSchema.methods.getTotalAmount = function () {
  return this.lineItems.reduce((sum, item) => sum + item.amount, 0);
};

export const Invoice = mongoose.model("Invoice", invoiceSchema);
