import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    name: String,
    fatherName: String,
    course: String,
    rollNumber: { type: String, unique: true },
    status: Boolean,
  },
  { timestamps: true }
);

export const Result = mongoose.model("Result", resultSchema);
