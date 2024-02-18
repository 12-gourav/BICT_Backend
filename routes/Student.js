import express from "express";
import {
  CreateStudent,
  DeleteStudent,
  GetStudent,
  SearchStudent,
  UpdateStudent,
  recentAddmission,
} from "../controllers/Student.js";

const Router = express.Router();

Router.post("/create/student", CreateStudent);
Router.get("/get/student", GetStudent);
Router.post("/update/student", UpdateStudent);
Router.get("/delete/student", DeleteStudent);
Router.get("/search/student", SearchStudent);
Router.get("/get/student2", recentAddmission);

export default Router;
