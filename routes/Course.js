import express from "express";
import {
  CreateCourse,
  DeleteCourse,
  GetCourse,
  GetHomeCourse,
  UpdateCourse,
  searchCourse,
} from "../controllers/Course.js";

const Router = express.Router();

Router.post("/create/course", CreateCourse);
Router.get("/get/course", GetCourse);
Router.get("/get/home/course", GetHomeCourse);
Router.post("/update/course", UpdateCourse);
Router.get("/delete/course", DeleteCourse);
Router.get("/search/course", searchCourse);

export default Router;
