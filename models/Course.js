import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: String,
    duration: String,
    rating: String,
    mode: String,
    users: String,
    shortDis: String,
    aboutDis: String,
    benifit: String,
    img: {
      public_id: String,
      url: String,
      hash: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
