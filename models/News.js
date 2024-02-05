import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    dis: String,
  },
  {
    timestamps: true,
  }
);

export const News = mongoose.model("News", NewsSchema);
