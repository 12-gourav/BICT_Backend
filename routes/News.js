import express from "express";
import {
  CreateNews,
  DeleteNews,
  GetNews,
  UpdateNews,
  searchNews,
} from "../controllers/News.js";

const Router = express.Router();

Router.post("/create/news", CreateNews);
Router.get("/get/news", GetNews);
Router.post("/update/news", UpdateNews);
Router.get("/delete/news", DeleteNews);
Router.get("/search/news", searchNews);

export default Router;
