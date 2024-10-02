import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

    // Construct the connection URI based on the presence of credentials
    let dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    if (DB_USER && DB_PASS) {
      dbURI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    }

    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
