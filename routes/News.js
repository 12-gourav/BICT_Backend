import express from "express";
import {
  CreateNews,
  DeleteNews,
  GetNews,
  UpdateNews,
  getNews,
  searchNews,
} from "../controllers/News.js";

const Router = express.Router();

Router.post("/create/news", CreateNews);
Router.get("/get/news", GetNews);
Router.get("/get/news2", getNews);
Router.post("/update/news", UpdateNews);
Router.get("/delete/news", DeleteNews);
Router.get("/search/news", searchNews);

export default Router;
