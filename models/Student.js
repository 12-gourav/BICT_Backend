import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    father: String,
    mother: String,
    dob: String,
    gender: String,
    email: String,
    phone: String,
    homePhone: String,
    address: String,
    tenPercent: String,
    tenBoard: String,
    tenYear: String,
    enterPercent: String,
    enterBoard: String,
    enterYear: String,
    course: String,
    duration: String,
    addmissionID:{
      type:String,
      unique:true
    },
    status:{
      type:String,
      default:"Unpaid"
   
    }
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Students", studentSchema);
