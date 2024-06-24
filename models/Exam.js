import mongoose from "mongoose";


const ExamSchema = new mongoose.Schema({
    title:String,
    discription:String,
    link:String
},{timestamps:true});



export const Exam = mongoose.model("Exam",ExamSchema);