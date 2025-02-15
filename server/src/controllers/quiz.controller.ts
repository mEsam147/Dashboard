import { Response, Request } from "express";
import Quiz from "../models/quiz.model";
import Question from "../models/question.model";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions, studentAnswers, topic, course } = req.body;

    
    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message:
          "Title and an array of questions (with questionId) are required.",
      });
    }

    const questionIds = questions.map(
      (q: { questionId: string }) => q.questionId
    );


    const invalidQuestionIds = questionIds.filter(
      (id: string) => !ObjectId.isValid(id)
    );

    if (invalidQuestionIds.length > 0) {
      return res.status(400).json({
        message: "Invalid question ID format.",
        invalidIds: invalidQuestionIds,
      });
    }

    const existingQuestions = await Question.find({
      _id: { $in: questionIds },
    });
   
    const nonExistingQuestionIds = questionIds.filter(
      (id: string) => !existingQuestions.some((q) => q._id.toString() === id)
    );
    if (nonExistingQuestionIds.length > 0) {
      return res.status(400).json({
        message: "Some question IDs are invalid or not found.",
        nonExistingIds: nonExistingQuestionIds,
      });
    }

   
    let formattedStudentAnswers: {
      questionId: mongoose.Types.ObjectId;
      answer: string;
    }[] = [];
    if (studentAnswers && Array.isArray(studentAnswers)) {
      formattedStudentAnswers = studentAnswers.map(
        (sa: { questionId: string; answer: string }) => ({
          questionId: new ObjectId(sa.questionId),
          answer: sa.answer,
        })
      );
    }


    const newQuiz = new Quiz({
      title,
      topic,
      course,
      questions: existingQuestions.map((q) => ({ questionId: q._id })),
      studentAnswers: formattedStudentAnswers, // Optional student answers
    });

    await newQuiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: newQuiz,
    });
  } catch (error: unknown) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find()
      .populate("questions.questionId")
      .populate("studentAnswers.questionId");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id)
      .populate("questions.questionId")
      .populate("studentAnswers.questionId");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
export const getRandomQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const randomQuizzes = await Quiz.aggregate([
      { $match: { hidden: { $ne: true } } },
      { $sample: { size: 2 } },
    ]);

    if (!randomQuizzes || randomQuizzes.length === 0) {
      res.status(404).json({ message: "No quizzes found." });
      return;
    }

    const quizzes = await Quiz.find({
      _id: { $in: randomQuizzes.map((quiz) => quiz._id) },
    })
      .populate("questions.questionId")
      .populate("studentAnswers.questionId");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching random quizzes:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, questions, studentAnswers } = req.body;

    
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    if (title) quiz.title = title;
    if (questions)
      quiz.questions = questions.map((q: { questionId: string }) => ({
        questionId: q.questionId,
      }));
    if (studentAnswers)
      quiz.studentAnswers = studentAnswers.map(
        (sa: { questionId: string; answer: string }) => ({
          questionId: sa.questionId,
          answer: sa.answer,
        })
      );

    await quiz.save();
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    res.status(200).json({ message: "Quiz deleted successfully." });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};

export const submitQuizAnswers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      studentAnswers,
    }: { studentAnswers: { questionId: string; answer: string }[] } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid quiz ID." });
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    if (
      !studentAnswers ||
      !Array.isArray(studentAnswers) ||
      studentAnswers.length === 0
    ) {
      return res.status(400).json({
        message: "Student answers are required and must be a non-empty array.",
      });
    }

    quiz.studentAnswers.push(
      ...studentAnswers.map(({ questionId, answer }) => ({
        questionId: new mongoose.Types.ObjectId(questionId),
        answer,
      }))
    );
    if (studentAnswers.length !== 0) {
      quiz.completed = true;
    }

    await quiz.save();
    res
      .status(200)
      .json({ message: "Quiz answers submitted successfully", quiz });
  } catch (error) {
    console.error("Error submitting quiz answers:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
