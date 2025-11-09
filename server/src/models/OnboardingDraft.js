import mongoose from "mongoose";

const onboardingDraftSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stepCompleted: { type: Number, default: 1 }, // 1-5
    data: { type: mongoose.Schema.Types.Mixed, default: {} } // JSON blob of multi-step fields
  },
  { timestamps: true }
);

onboardingDraftSchema.statics.upsertForUser = async function ({
  userId,
  stepCompleted,
  stepData
}) {
  const existing = await this.findOne({ user: userId });

  if (!existing) {
    return this.create({
      user: userId,
      stepCompleted,
      data: stepData
    });
  }

  existing.stepCompleted = Math.max(existing.stepCompleted, stepCompleted);
  existing.data = { ...existing.data, ...stepData };
  await existing.save();
  return existing;
};

export const OnboardingDraft = mongoose.model("OnboardingDraft", onboardingDraftSchema);
