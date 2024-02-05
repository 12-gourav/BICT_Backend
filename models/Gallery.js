import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    caption: String,
    img: {
      public_id: String,
      url: String,
      hash:String,
    },
  },
  {
    timestamps: true,
  }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);
