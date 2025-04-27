import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { quizGenerationSchema, pdfParseSchema, insertQuizSchema, insertQuestionSchema } from "@shared/schema";
import { generateQuiz } from "./lib/openai";
import { extractTextFromPDF } from "./lib/pdfParser";
import { v4 as uuidv4 } from 'uuid';

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.post("/api/quiz/generate", async (req, res) => {
    try {
      // Validate request
      const validatedData = quizGenerationSchema.parse(req.body);
      
      // Generate quiz using OpenAI
      const generatedQuizData = await generateQuiz(
        validatedData.topic,
        validatedData.questionCount,
        validatedData.questionTypes,
        validatedData.difficulty
      );
      
      // Save quiz to database
      const quizData = {
        title: generatedQuizData.title || `Quiz on ${validatedData.topic}`,
        topic: validatedData.topic,
        questionCount: validatedData.questionCount,
        difficulty: validatedData.difficulty,
        questionTypes: validatedData.questionTypes,
        createdAt: new Date().toISOString(),
      };
      
      const newQuiz = await storage.createQuiz(quizData);
      
      // Save questions to database
      const savedQuestions = await Promise.all(
        generatedQuizData.questions.map(async (q: {
          questionText: string;
          options: any[];
          correctAnswer: string;
          explanation: string;
          type: string;
        }) => {
          const questionData = {
            quizId: newQuiz.id,
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            type: q.type,
          };
          
          return await storage.createQuestion(questionData);
        })
      );
      
      // Return the complete quiz with questions
      res.json({
        ...newQuiz,
        questions: savedQuestions
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        console.error("Error generating quiz:", error);
        res.status(500).json({ message: "Failed to generate quiz" });
      }
    }
  });
  
  app.post("/api/quiz/generate-from-pdf", upload.single("file"), async (req, res) => {
    try {
      console.log("PDF upload request received:", {
        body: req.body,
        file: req.file ? {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          fieldname: req.file.fieldname
        } : 'No file'
      });
      
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded. Please select a PDF file." });
      }
      
      // Extract parameters from request
      const questionCount = parseInt(req.body.questionCount, 10);
      const questionTypes = JSON.parse(req.body.questionTypes);
      const difficulty = req.body.difficulty;
      
      // Validate parameters
      if (isNaN(questionCount) || questionCount < 1) {
        return res.status(400).json({ message: "Invalid question count" });
      }
      
      if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
        return res.status(400).json({ message: "Invalid question types" });
      }
      
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return res.status(400).json({ message: "Invalid difficulty level" });
      }
      
      const validatedData = {
        questionCount,
        questionTypes,
        difficulty
      };
      
      // Extract text from PDF
      const pdfText = await extractTextFromPDF(req.file.buffer);
      console.log(`Extracted ${pdfText.length} characters from PDF`);
      
      if (pdfText.length < 100) {
        return res.status(400).json({ 
          message: "The PDF contains too little text to generate a quiz. Please upload a PDF with more content."
        });
      }
      
      const fileName = req.file.originalname.replace('.pdf', '');
      
      // Generate quiz from PDF content
      console.log("Generating quiz from PDF content...");
      const generatedQuizData = await generateQuiz(
        pdfText,
        validatedData.questionCount,
        validatedData.questionTypes,
        validatedData.difficulty,
        true // isFromPdf
      );
      
      console.log("Quiz generated successfully");
      
      // Save quiz to database
      const quizData = {
        title: generatedQuizData.title || `Quiz on ${fileName}`,
        topic: fileName,
        questionCount: validatedData.questionCount,
        difficulty: validatedData.difficulty,
        questionTypes: validatedData.questionTypes,
        createdAt: new Date().toISOString(),
      };
      
      const newQuiz = await storage.createQuiz(quizData);
      
      // Save questions to database
      console.log(`Saving ${generatedQuizData.questions.length} questions to database...`);
      const savedQuestions = await Promise.all(
        generatedQuizData.questions.map(async (q: {
          questionText: string;
          options: any[];
          correctAnswer: string;
          explanation: string;
          type: string;
        }) => {
          const questionData = {
            quizId: newQuiz.id,
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            type: q.type,
          };
          
          return await storage.createQuestion(questionData);
        })
      );
      
      console.log("Questions saved successfully");
      
      // Return the complete quiz with questions
      res.json({
        ...newQuiz,
        questions: savedQuestions
      });
    } catch (error) {
      console.error("Error generating quiz from PDF:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to generate quiz from PDF" });
      }
    }
  });

  // Route to get a quiz by ID
  app.get("/api/quiz/:id", async (req, res) => {
    try {
      const quizId = parseInt(req.params.id, 10);
      if (isNaN(quizId)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
      }
      
      const quiz = await storage.getQuiz(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      
      const questions = await storage.getQuestions(quizId);
      
      res.json({
        ...quiz,
        questions
      });
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ message: "Failed to fetch quiz" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
