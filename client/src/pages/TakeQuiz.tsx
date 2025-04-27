import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { getCurrentQuiz, getQuizById, saveQuizHistory } from "@/lib/localStorage";
import { Question, Quiz, QuizAnswer, QuizResult } from "@/types";

const TakeQuiz = () => {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/quiz/:id");
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Load the quiz either from current quiz or history
    const quizId = params?.id;
    if (!quizId) {
      setLocation("/");
      return;
    }

    const currentQuiz = getCurrentQuiz();
    let loadedQuiz: Quiz | null | undefined = null;
    
    if (currentQuiz && currentQuiz.id === quizId) {
      loadedQuiz = currentQuiz;
    } else {
      loadedQuiz = getQuizById(quizId);
    }
    
    if (!loadedQuiz || !loadedQuiz.questions || loadedQuiz.questions.length === 0) {
      toast({
        title: "Quiz not found",
        description: "Please create a new quiz",
        variant: "destructive"
      });
      setLocation("/create");
      return;
    }
    
    setQuiz(loadedQuiz);
    setLoading(false);
  }, [params, setLocation, toast]);
  
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const goToNextQuestion = () => {
    if (!quiz || !quiz.questions) return;
    
    // If not answered yet, show a reminder
    const currentQuestionId = quiz.questions[currentQuestionIndex].id;
    if (!answers[currentQuestionId]) {
      toast({
        title: "No answer selected",
        description: "Please select an answer before proceeding",
        variant: "default"
      });
      return;
    }
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmitQuiz = () => {
    if (!quiz || !quiz.questions) return;
    
    // Check if all questions are answered
    const unansweredCount = quiz.questions.filter(q => !answers[q.id]).length;
    if (unansweredCount > 0) {
      toast({
        title: `${unansweredCount} question${unansweredCount > 1 ? 's' : ''} unanswered`,
        description: "Please answer all questions before submitting",
        variant: "default"
      });
      return;
    }
    
    // Calculate results
    let correctCount = 0;
    const incorrectAnswers = [];
    
    for (const question of quiz.questions) {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectAnswers.push({
          question: question.questionText,
          userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        });
      }
    }
    
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const result: QuizResult = {
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      correctCount,
      incorrectCount: quiz.questions.length - correctCount,
      incorrectAnswers
    };
    
    // Save quiz result to history
    saveQuizHistory({
      quiz,
      result,
      date: new Date().toISOString()
    });
    
    // Redirect to results page
    setLocation(`/results/${quiz.id}`);
  };
  
  if (loading || !quiz || !quiz.questions) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-md">
          <div className="px-6 py-4 bg-primary flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
            <div className="text-white">
              <span className="font-medium">Question</span>{" "}
              <span>{currentQuestionIndex + 1}</span>
              <span>/</span>
              <span>{quiz.questions.length}</span>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{currentQuestion.questionText}</h2>
              </div>

              {currentQuestion.type === "multipleChoice" && (
                <RadioGroup 
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        id={option.id} 
                        value={option.text} 
                      />
                      <Label htmlFor={option.id} className="font-medium text-gray-700">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === "trueFalse" && (
                <RadioGroup 
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="true" value="True" />
                    <Label htmlFor="true" className="font-medium text-gray-700">
                      True
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="false" value="False" />
                    <Label htmlFor="false" className="font-medium text-gray-700">
                      False
                    </Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === "shortAnswer" && (
                <div>
                  <Label htmlFor="short-answer" className="sr-only">
                    Your Answer
                  </Label>
                  <Input
                    id="short-answer"
                    placeholder="Write your answer here..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  />
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                  <Button 
                    onClick={handleSubmitQuiz}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button 
                    onClick={goToNextQuestion}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TakeQuiz;
