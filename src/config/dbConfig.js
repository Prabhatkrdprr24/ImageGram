import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, { dbName: "ImageGram" });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;