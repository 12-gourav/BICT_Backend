import express from "express";
import { LoadUser, Login, register } from "../controllers/User.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", Login);
Router.get("/load", isAuthenticated, LoadUser);

export default Router;
