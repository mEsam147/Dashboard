import mongoose, { ConnectOptions } from "mongoose";

export const ConnectionDatabase = async (): Promise<void> => {
  // Check if the MONGO_URL environment variable is set
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.error("MongoDB URL is not set in the environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
