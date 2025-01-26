import express from "express";
import { CreateResult, deleteResult, getResultbynumber, getResults, UpdateResult } from "../controllers/Result.js";


const router = express.Router();

router.post("/create/result",CreateResult);
router.get("/get/result/by/id",getResultbynumber);
router.get("/get/results",getResults);
router.get("/delete/result",deleteResult);
router.post("/update/result",UpdateResult);





export default router