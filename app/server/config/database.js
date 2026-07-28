import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
    try {

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔄 Connecting to MongoDB...");
        console.log(
            `📍 URI: ${
                env.database.uri
                    ? env.database.uri.replace(
                          /\/\/([^:]+):([^@]+)@/,
                          "//*****:*****@"
                      )
                    : "Not Found"
            }`
        );

        const connection = await mongoose.connect(
            env.database.uri
        );

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📦 Database : ${connection.connection.name}`);
        console.log(`🖥️ Host     : ${connection.connection.host}`);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    } catch (error) {

        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ MongoDB Connection Failed");
        console.error(`Error : ${error.message}`);
        console.error(`Code  : ${error.code || "N/A"}`);
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        process.exit(1);
    }
};

/**
 * Connection Events
 */

mongoose.connection.on("connecting", () => {
    console.log("🟡 Connecting to MongoDB...");
});

mongoose.connection.on("connected", () => {
    console.log("🟢 MongoDB connection established.");
});

mongoose.connection.on("open", () => {
    console.log("🟢 MongoDB connection opened.");
});

mongoose.connection.on("reconnected", () => {
    console.log("🟡 MongoDB reconnected.");
});

mongoose.connection.on("disconnected", () => {
    console.log("🔴 MongoDB disconnected.");
});

mongoose.connection.on("error", (error) => {
    console.error("🔴 MongoDB Error:");
    console.error(error);
});

/**
 * Graceful Shutdown
 */
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed.");
    process.exit(0);
});

export default connectDB;