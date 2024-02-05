import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    name: String,
    course: String,
    category: String,
    certificate: {
      type: String,
    },
    img: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Certificate = mongoose.model("Certificates", CertificateSchema);
