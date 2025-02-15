import mongoose from "mongoose";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

// Define the schema for questions
const questionSchema = new mongoose.Schema<Question>(
  {
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a model from the schema
export default mongoose.model<Question>("Question", questionSchema);
