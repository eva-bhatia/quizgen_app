// Client-side types for the application

export interface QuizOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionTypes: Array<'multipleChoice' | 'trueFalse' | 'shortAnswer'>;
  createdAt: string;
  questions?: Question[];
  // PDF-related properties
  pdfFileName?: string;
  pdfFileType?: string;
}

export interface QuizResult {
  quizId: string;
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
}

export interface QuizHistoryItem {
  quiz: Quiz;
  result: QuizResult;
  date: string;
}

export interface QuizSettings {
  topic: string;
  questionCount: number;
  questionTypes: Array<'multipleChoice' | 'trueFalse' | 'shortAnswer'>;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}
