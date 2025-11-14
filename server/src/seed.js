import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Lease } from "./models/Lease.js";
import { Invoice } from "./models/Invoice.js";
import { Payment } from "./models/Payment.js";
import { MaintenanceRequest } from "./models/MaintenanceRequest.js";
import { OnboardingDraft } from "./models/OnboardingDraft.js";
import { Notice } from "./models/Notice.js";

async function run() {
  try {
    console.log("Connecting to Mongo...");
    await connectDB();

    console.log("Clearing existing data (dev only)...");
    await Promise.all([
      User.deleteMany({}),
      Lease.deleteMany({}),
      Invoice.deleteMany({}),
      Payment.deleteMany({}),
      MaintenanceRequest.deleteMany({}),
      OnboardingDraft.deleteMany({}),
      Notice.deleteMany({})
    ]);

    console.log("Creating users...");

    const tenantPassword = "password123";
    const adminPassword = "admin123";

    const tenant = await User.create({
      email: "tenant@example.com",
      passwordHash: await bcrypt.hash(tenantPassword, 10),
      role: "tenant",
      name: "Test Tenant"
    });

    const admin = await User.create({
      email: "admin@example.com",
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: "admin",
      name: "Test Admin"
    });

    console.log("Tenant ID:", tenant._id.toString());
    console.log("Admin ID:", admin._id.toString());

    console.log("Creating lease...");

    const lease = await Lease.create({
      tenant: tenant._id,
      unit: "2B1B",
      startDate: new Date("2025-08-01"),
      endDate: new Date("2026-07-31"),
      rentAmount: 1450,
      depositAmount: 1450,
      status: "active",
      termsUrl: "https://example.com/lease.pdf"
    });

    console.log("Lease ID:", lease._id.toString());

    console.log("Creating invoices...");

    const invoices = await Invoice.insertMany([
      {
        invoiceNumber: "INV-2025-001",
        tenant: tenant._id,
        lease: lease._id,
        issueDate: new Date("2025-08-25"),
        dueDate: new Date("2025-09-01"),
        status: "paid",
        notes: "September rent plus storage fee.",
        lineItems: [
          { title: "September Rent", description: "Monthly rent", amount: 1450 },
          { title: "Storage Locker", description: "Optional storage add-on", amount: 50 }
        ]
      },
      {
        invoiceNumber: "INV-2025-002",
        tenant: tenant._id,
        lease: lease._id,
        issueDate: new Date("2025-09-25"),
        dueDate: new Date("2025-10-01"),
        status: "sent",
        notes: "October rent, water usage estimate.",
        lineItems: [
          { title: "October Rent", description: "Monthly rent", amount: 1450 },
          { title: "Water Utility", description: "Flat usage estimate", amount: 40 }
        ]
      },
      {
        invoiceNumber: "INV-2025-003",
        tenant: tenant._id,
        lease: lease._id,
        issueDate: new Date("2025-10-25"),
        dueDate: new Date("2025-11-01"),
        status: "sent",
        notes: "November rent and pet fee.",
        lineItems: [
          { title: "November Rent", description: "Monthly rent", amount: 1450 },
          { title: "Pet Fee", description: "Monthly pet rent", amount: 75 }
        ]
      }
    ]);

    console.log("Invoice IDs:", invoices.map(i => i._id.toString()));

    console.log("Creating payments...");

    const payments = await Payment.insertMany([
      {
        tenant: tenant._id,
        lease: lease._id,
        invoice: invoices[0]._id,
        date: new Date("2025-09-01"),
        amount: 1500,
        status: "paid",
        method: "ach"
      },
      {
        tenant: tenant._id,
        lease: lease._id,
        invoice: invoices[1]._id,
        date: new Date("2025-10-01"),
        amount: 1490,
        status: "overdue",
        method: "ach"
      },
      {
        tenant: tenant._id,
        lease: lease._id,
        invoice: invoices[2]._id,
        date: new Date("2025-11-01"),
        amount: 1525,
        status: "pending",
        method: "ach"
      }
    ]);

    console.log("Created payments:", payments.map(p => p._id.toString()));

    console.log("Creating maintenance request...");

    const ticket = await MaintenanceRequest.create({
      tenant: tenant._id,
      issueType: "Plumbing",
      description: "Leaking faucet in kitchen.",
      status: "pending"
    });

    console.log("Maintenance ticket ID:", ticket._id.toString());

    console.log("Creating onboarding draft...");

    const draft = await OnboardingDraft.create({
      user: tenant._id,
      stepCompleted: 5,
      data: {
        account: { email: tenant.email, name: tenant.name },
        personalInfo: { phone: "555-123-4567", emergencyContact: "John Doe" },
        leaseDetails: { unit: lease.unit, startDate: lease.startDate, endDate: lease.endDate },
        paymentPref: { method: "ach", bankName: "Demo Bank" }
      }
    });

    console.log("Onboarding draft ID:", draft._id.toString());

    console.log("✅ Seed complete.");
    console.log("Login test credentials:");
    console.log("  Tenant:", tenant.email, "/", tenantPassword);
    console.log("  Admin :", admin.email, "/", adminPassword);

    console.log("Creating notices...");

    const notices = await Notice.insertMany([
      {
        title: "Annual Fire Alarm Testing",
        body: "Fire alarm inspections will take place on Saturday between 9:00 AM and 12:00 PM.",
        active: true
      },
      {
        title: "Online Portal Reminder",
        body: "You can view rent status, maintenance requests, and lease details anytime through this portal.",
        active: true
      }
    ]);

    console.log("Notice IDs:", notices.map(n => n._id.toString()));


    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

run();
