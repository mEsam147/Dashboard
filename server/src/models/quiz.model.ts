import mongoose from "mongoose";

// interface Quiz {
//   title: string;
//   topic: string;
//   course: string;
//   questions: [];
//   studentAnswers: [];
//   completed: boolean;
// }
// Define the quiz schema
const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    course: { type: String, required: true },
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
      },
    ],
    studentAnswers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: { type: String, required: true },
        default: [],
      },
    ],
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
