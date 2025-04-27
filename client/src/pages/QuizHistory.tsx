import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getQuizHistory, deleteQuizFromHistory } from "@/lib/localStorage";
import { QuizHistoryItem } from "@/types";
import { RefreshCcw, FileText, Trash2 } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const QuizHistory = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    const quizHistory = getQuizHistory();
    setHistory(quizHistory);
  }, []);
  
  const handleRetakeQuiz = (quizId: string) => {
    setLocation(`/quiz/${quizId}`);
  };
  
  const handleViewResults = (quizId: string) => {
    setLocation(`/results/${quizId}`);
  };
  
  const handleDeleteQuiz = (quizId: string) => {
    deleteQuizFromHistory(quizId);
    setHistory(getQuizHistory());
    setQuizToDelete(null);
    toast({
      title: "Quiz deleted",
      description: "The quiz has been removed from your history",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Quiz History</h1>
          <p className="mt-4 text-xl text-gray-600">View and retake your previous quizzes</p>
        </div>

        <Card className="shadow-md bg-white">
          <CardContent className="p-6">
            {history.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-gray-600 mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No quizzes yet</h3>
                <p className="mt-2 text-gray-600 mb-6">
                  Create your first quiz to get started.
                </p>
                <Link href="/create">
                  <Button className="bg-primary hover:bg-primary/90">
                    Create a Quiz
                  </Button>
                </Link>
              </div>
            ) : (
              history.map((item, index) => (
                <div 
                  key={item.quiz.id}
                  className={`border-b border-gray-200 pb-4 mb-4 ${
                    index === history.length - 1 ? "last:mb-0 last:pb-0 last:border-0" : ""
                  }`}
                >
                  <div className="md:flex md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.quiz.title}</h3>
                      <p className="text-sm text-gray-500">Created on {formatDate(item.date)}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 mr-2">
                          {item.quiz.questionCount} questions
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 mr-2">
                          {item.quiz.difficulty}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                          {item.quiz.questionTypes.includes('multipleChoice') ? 'Multiple Choice' : ''}
                          {item.quiz.questionTypes.includes('trueFalse') ? (item.quiz.questionTypes.includes('multipleChoice') ? ', True/False' : 'True/False') : ''}
                          {item.quiz.questionTypes.includes('shortAnswer') ? (item.quiz.questionTypes.length > 1 ? ', Short Answer' : 'Short Answer') : ''}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-4">
                        Score: {item.result.score}%
                      </span>
                      <Button
                        variant="outline" 
                        size="sm" 
                        className="mr-2 text-primary-700 border-primary-100 bg-primary-50 hover:bg-primary-100"
                        onClick={() => handleRetakeQuiz(item.quiz.id)}
                      >
                        <RefreshCcw className="h-3.5 w-3.5 mr-1" />
                        Retake
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleViewResults(item.quiz.id)}
                      >
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        View
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-700 border-red-100 bg-red-50 hover:bg-red-100"
                            onClick={() => setQuizToDelete(item.quiz.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this quiz from your history. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setQuizToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteQuiz(item.quiz.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuizHistory;
