import express from "express";
import { CreateExam, DeleteExam, GetExams, UpdateExam, searchExams } from "../controllers/ExamController.js";


const Router = express.Router();

Router.post("/create/exam", CreateExam);
Router.get("/get/exam", GetExams);
Router.post("/update/exam", UpdateExam);
Router.get("/delete/exam", DeleteExam);
Router.get("/search/exam", searchExams);

export default Router;
