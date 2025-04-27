import { z } from "zod";

// User interface for in-memory storage
export interface User {
  id: number;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Quiz interface for in-memory storage
export interface Quiz {
  id: number;
  title: string;
  topic: string;
  questionCount: number;
  difficulty: string;
  questionTypes: string[];
  createdAt: string;
}

export const insertQuizSchema = z.object({
  title: z.string(),
  topic: z.string(),
  questionCount: z.number(),
  difficulty: z.string(),
  questionTypes: z.array(z.string()),
  createdAt: z.string(),
});

// Question interface for in-memory storage
export interface Question {
  id: number;
  quizId: number;
  questionText: string;
  options: any;
  correctAnswer: string;
  explanation: string;
  type: string;
}

export const insertQuestionSchema = z.object({
  quizId: z.number(),
  questionText: z.string(),
  options: z.any(),
  correctAnswer: z.string(),
  explanation: z.string(),
  type: z.string(),
});

// Generated quiz schema
export const quizGenerationSchema = z.object({
  topic: z.string().min(2, "Topic is required"),
  questionCount: z.number().min(1).max(30),
  questionTypes: z.array(z.enum(["multipleChoice", "trueFalse", "shortAnswer"])),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

// PDF parsing schema
export const pdfParseSchema = z.object({
  file: z.any(),
  questionCount: z.number().min(1).max(30),
  questionTypes: z.array(z.enum(["multipleChoice", "trueFalse", "shortAnswer"])),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type QuizGeneration = z.infer<typeof quizGenerationSchema>;
export type PdfParse = z.infer<typeof pdfParseSchema>;

export type QuizOption = {
  id: string;
  text: string;
};

export type QuizResult = {
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  incorrectAnswers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
};
