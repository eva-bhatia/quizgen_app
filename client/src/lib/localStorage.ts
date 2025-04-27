import { Quiz, QuizHistoryItem, QuizResult } from '../types';

const QUIZ_HISTORY_KEY = 'quizify-history';
const CURRENT_QUIZ_KEY = 'quizify-current-quiz';

// Save quiz history to local storage
export const saveQuizHistory = (historyItem: QuizHistoryItem): void => {
  const history = getQuizHistory();
  history.unshift(historyItem);
  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history));
};

// Get quiz history from local storage
export const getQuizHistory = (): QuizHistoryItem[] => {
  const history = localStorage.getItem(QUIZ_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

// Save current quiz to local storage (for persistence during quiz creation/taking)
export const saveCurrentQuiz = (quiz: Quiz): void => {
  localStorage.setItem(CURRENT_QUIZ_KEY, JSON.stringify(quiz));
};

// Get current quiz from local storage
export const getCurrentQuiz = (): Quiz | null => {
  const quiz = localStorage.getItem(CURRENT_QUIZ_KEY);
  return quiz ? JSON.parse(quiz) : null;
};

// Clear current quiz from local storage
export const clearCurrentQuiz = (): void => {
  localStorage.removeItem(CURRENT_QUIZ_KEY);
};

// Get a specific quiz by ID from history
export const getQuizById = (id: string): Quiz | undefined => {
  const history = getQuizHistory();
  const historyItem = history.find(item => item.quiz.id === id);
  return historyItem?.quiz;
};

// Get a specific quiz result by quiz ID
export const getResultByQuizId = (id: string): QuizResult | undefined => {
  const history = getQuizHistory();
  const historyItem = history.find(item => item.quiz.id === id);
  return historyItem?.result;
};

// Delete a quiz from history
export const deleteQuizFromHistory = (id: string): void => {
  const history = getQuizHistory();
  const updatedHistory = history.filter(item => item.quiz.id !== id);
  localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updatedHistory));
};
