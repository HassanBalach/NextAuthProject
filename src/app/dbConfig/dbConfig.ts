import mongoose from "mongoose";

export async function connection() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const Connection = mongoose.connection;
    Connection.on("connected", () => {
      console.log("Database is connected successfully:");
    });
    Connection.on("error", (err) => {
      console.log("Something went wrong in connecting db " + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connected db");
    console.log(error);
  }
}
