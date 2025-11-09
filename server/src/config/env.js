import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "quietlyInvestigatingCheeseBalls",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/property_mgmt",
};
