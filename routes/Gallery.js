import express from "express";
import {
  DeleteGallery,
  CreateGallery,
  GetGallery,
  UpdateGallery,
  SearchGallery,
} from "../controllers/Gallery.js";

const Router = express.Router();

Router.post("/create/gallery", CreateGallery);
Router.get("/get/gallery", GetGallery);
Router.post("/update/gallery", UpdateGallery);
Router.get("/delete/gallery", DeleteGallery);
Router.get("/search/gallery", SearchGallery);

export default Router;
