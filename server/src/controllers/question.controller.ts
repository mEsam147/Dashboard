import { Request, Response } from "express";
import Question from "../models/question.model";

export const createQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { questionText, options, correctAnswer } = req.body;

  if (!questionText || !options || !correctAnswer) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const question = new Question({
      questionText,
      options,
      correctAnswer,
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getAllQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await Question.find().exec();
    if (!questions) res.status(404).json({ message: "No questions found" });

    res.json(questions);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve questions" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Unknown error" });
    }
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving question", error });
  }
};
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedQuestion)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error });
  }
};
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error });
  }
};
