import dns from "node:dns";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function seedAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");

        const existingAdmin = await User.findOne({ email: "admin@akshu.com" });

        if (existingAdmin) {
            console.log("Admin user already exists with email: admin@akshu.com");
        } else {
            const admin = await User.create({
                firstName: "Admin",
                lastName: "User",
                email: "admin@akshu.com",
                password: "admin123456",
                role: "SUPER_ADMIN",
                isActive: true
            });
            console.log("Admin user created successfully!");
            console.log("Email: admin@akshu.com");
            console.log("Password: admin123456");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedAdmin();
