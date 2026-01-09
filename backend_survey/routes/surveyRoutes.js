import express from "express";
import { 
  createSurvey, 
  getSurveys, 
  getSurvey,
  submitResponse 
} from "../controllers/surveyController.js";

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getSurveys);
router.get("/:id", getSurvey);
router.post("/:id/response", submitResponse);

export default router;