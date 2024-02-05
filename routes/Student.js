import express from "express";
import {
  CreateStudent,
  DeleteStudent,
  GetStudent,
  SearchStudent,
  UpdateStudent,
} from "../controllers/Student.js";

const Router = express.Router();

Router.post("/create/student", CreateStudent);
Router.get("/get/student", GetStudent);
Router.post("/update/student", UpdateStudent);
Router.get("/delete/student", DeleteStudent);
Router.get("/search/student", SearchStudent);

export default Router;
