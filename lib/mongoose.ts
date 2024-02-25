"use server";
import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("MiSSING MONGODB_URL");
  }

  if (isConnected) {
    console.log("mongodb is connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL,
        {
          dbName: "TunisiaFlow",
        });
        isConnected = true;



  } catch (error) {


  }
};
