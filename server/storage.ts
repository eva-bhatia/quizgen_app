import { type User, type InsertUser, type Quiz, type InsertQuiz, type Question, type InsertQuestion } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz related methods
  getQuiz(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuestions(quizId: number): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private quizzes: Quiz[] = [];
  private questions: Question[] = [];
  private userId = 1;
  private quizId = 1;
  private questionId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.userId++,
      ...insertUser
    };
    this.users.push(newUser);
    return newUser;
  }

  async getQuiz(id: number): Promise<Quiz | undefined> {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const newQuiz: Quiz = {
      id: this.quizId++,
      ...insertQuiz
    };
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  async getQuestions(quizId: number): Promise<Question[]> {
    return this.questions.filter(question => question.quizId === quizId);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const newQuestion: Question = {
      id: this.questionId++,
      ...insertQuestion
    };
    this.questions.push(newQuestion);
    return newQuestion;
  }
}

export const storage = new MemStorage();
