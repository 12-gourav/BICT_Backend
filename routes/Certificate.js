import express from "express";
import {
  CreateCertificate,
  DeleteCertificate,
  GetCertificates,
  SearchCertificates,
  UpdateCertificate,
  singleCertificate,
} from "../controllers/Certificate.js";

const Router = express.Router();

Router.post("/create/certificate", CreateCertificate);
Router.get("/get/certificate", GetCertificates);
Router.post("/update/certificate", UpdateCertificate);
Router.get("/delete/certificate", DeleteCertificate);
Router.get("/search/certificate", SearchCertificates);
Router.get("/search/single/certificates", singleCertificate);

export default Router;
