import { Router, RequestHandler } from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  getRandomQuiz,
  submitQuizAnswers,
  updateQuiz,
} from "../controllers/quiz.controller";

const router: Router = Router();

router.post("/", createQuiz as RequestHandler);
router.get("/", getAllQuizzes);
router.get("/random", getRandomQuiz);

router.get("/:id", getQuizById as unknown as RequestHandler);
router.put("/:id", updateQuiz as unknown as RequestHandler);

router.post("/:id/submit", submitQuizAnswers as unknown as RequestHandler);
router.delete("/:id", deleteQuiz as unknown as RequestHandler);

export default router;
