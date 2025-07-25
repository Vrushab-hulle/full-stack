import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Db connected: ${con.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to Db", error);
    process.exit(1);
  }
};
