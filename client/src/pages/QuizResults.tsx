import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getQuizById, getResultByQuizId } from "@/lib/localStorage";
import { Quiz, QuizResult } from "@/types";
import { Loader2, Check, X } from "lucide-react";

const QuizResults = () => {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/results/:id");
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const quizId = params?.id;
    
    // Only run this effect when we have a valid quiz ID
    if (!quizId) {
      setLocation("/");
      return;
    }

    // Try to load quiz and results data
    try {
      const loadedQuiz = getQuizById(quizId);
      const loadedResult = getResultByQuizId(quizId);
      
      if (!loadedQuiz || !loadedResult) {
        toast({
          title: "Results not found",
          description: "We couldn't find the quiz results",
          variant: "destructive"
        });
        setLocation("/");
        return;
      }
      
      setQuiz(loadedQuiz);
      setResult(loadedResult);
    } catch (error) {
      console.error("Error loading quiz results:", error);
      toast({
        title: "Error loading results",
        description: "An error occurred while loading quiz results",
        variant: "destructive"
      });
      setLocation("/");
    } finally {
      setLoading(false);
    }
    
    // This effect should only run when the quiz ID changes
  }, [params?.id]);
  
  const handleRetakeQuiz = () => {
    if (!quiz) return;
    setLocation(`/quiz/${quiz.id}`);
  };
  
  const handleCreateNewQuiz = () => {
    setLocation("/create");
  };
  
  if (loading || !quiz || !result) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md">
          <div className="px-6 py-4 bg-primary">
            <h1 className="text-xl font-bold text-white">Quiz Results</h1>
          </div>

          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
              <div>
                <span className="text-3xl font-bold text-primary">{result.score}%</span>
                <span className="text-gray-600 ml-1">Score</span>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Total Questions</p>
                <p className="text-xl font-bold text-gray-900">{result.totalQuestions}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Correct</p>
                <p className="text-xl font-bold text-green-600">{result.correctCount}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-500">Incorrect</p>
                <p className="text-xl font-bold text-red-600">{result.incorrectCount}</p>
              </div>
            </div>

            {/* Detailed Results */}
            {result.incorrectAnswers.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Questions You Missed</h3>

                {result.incorrectAnswers.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600">
                          <X className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">{item.question}</h4>
                        <div className="mt-2 text-sm">
                          <p className="text-gray-500">Your answer: <span className="text-red-600 font-medium">{item.userAnswer}</span></p>
                          <p className="text-gray-500">Correct answer: <span className="text-green-600 font-medium">{item.correctAnswer}</span></p>
                        </div>
                        <div className="mt-2 bg-blue-50 p-3 rounded text-sm text-blue-700">
                          <p><strong>Explanation:</strong> {item.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-green-50 rounded-lg">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Perfect Score!</h3>
                <p className="mt-2 text-gray-600">
                  Congratulations! You answered all questions correctly.
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Link href="/history">
                <Button variant="outline">
                  View All Quizzes
                </Button>
              </Link>
              <div className="space-x-3">
                <Button variant="outline" onClick={handleRetakeQuiz}>
                  Try Again
                </Button>
                <Button 
                  onClick={handleCreateNewQuiz}
                  className="bg-primary hover:bg-primary/90"
                >
                  Create New Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuizResults;
