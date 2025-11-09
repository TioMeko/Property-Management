import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import onboardingRoutes from "./routes/onboarding.js";
import maintenanceRoutes from "./routes/maintenance.js";
import paymentsRoutes from "./routes/payments.js";
import leaseRoutes from "./routes/lease.js";
import tenantRoutes from "./routes/tenant.js";   // <-- add this

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/payments", paymentsRoutes);
app.use("/lease", leaseRoutes);
app.use("/tenant", tenantRoutes);                // <-- and mount it here

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`API listening on http://localhost:${config.port}`);
  });
}

start();
