// import { Question } from "./question.type";

import { Question } from "./question.type";

export interface Quiz {
  _id: string; 
  title: string; 
  topic: string; 
  course: string;
  createdAt: string; 
  updatedAt: string; 
  completed: boolean;
  questions: {
    _id: string;
    questionId: Question; 
  }[]; 
  studentAnswers: {
    questionId: string; 
    answer: string; 
  }[]; 
  __v: number; 
}

export interface StudentAnswer {
  _id: string;
  questionId: {
    _id: string;
    questionId: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  answer: string;
}

export type CreateQuizPayload = {
  title: string;
  topic: string;
  course: string;
  questions: {
    questionId: string;
  }[];
};
