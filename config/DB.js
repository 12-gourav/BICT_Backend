import { mongoose } from "mongoose";

export const DB_Connect = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL);
    if (data) {
      console.log("Database Connect Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
