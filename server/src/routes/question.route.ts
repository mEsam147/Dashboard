import express, { RequestHandler } from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestionById,
  updateQuestion,
} from "../controllers/question.controller";

const router = express.Router();

router.post("/", createQuestion as RequestHandler);
router.get("/", getAllQuestion);
router.get("/:id", getQuestionById as RequestHandler);
router.put("/:id", updateQuestion as RequestHandler);
router.delete("/:id", deleteQuestion as RequestHandler);
export default router;
