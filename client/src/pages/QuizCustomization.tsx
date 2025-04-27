import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getCurrentQuiz, saveCurrentQuiz } from "@/lib/localStorage";
import { generateQuizFromTopic, generateQuizFromPDF } from "@/lib/openai";
import { Quiz } from "@/types";

const QuizCustomization = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [questionTypes, setQuestionTypes] = useState<Array<"multipleChoice" | "trueFalse" | "shortAnswer">>(["multipleChoice"]);
  
  useEffect(() => {
    const currentQuiz = getCurrentQuiz();
    if (!currentQuiz) {
      // Redirect if no quiz is being created
      toast({
        title: "No quiz found",
        description: "Please start by creating a new quiz",
        variant: "destructive"
      });
      setLocation("/create");
      return;
    }
    
    setQuiz(currentQuiz);
    // Set default values from current quiz if available
    if (currentQuiz.questionCount) setQuestionCount(currentQuiz.questionCount);
    if (currentQuiz.difficulty) setDifficulty(currentQuiz.difficulty as "easy" | "medium" | "hard");
    if (currentQuiz.questionTypes) setQuestionTypes(currentQuiz.questionTypes);
  }, [setLocation, toast]);
  
  const handleQuestionTypeChange = (
    type: "multipleChoice" | "trueFalse" | "shortAnswer", 
    checked: boolean
  ) => {
    if (checked) {
      setQuestionTypes([...questionTypes, type]);
    } else {
      // Ensure at least one type remains selected
      if (questionTypes.length > 1) {
        setQuestionTypes(questionTypes.filter(t => t !== type));
      } else {
        toast({
          title: "At least one question type required",
          description: "Please select at least one question type",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleBack = () => {
    setLocation("/create");
  };
  
  const handleGenerateQuiz = async () => {
    if (!quiz) return;
    
    // Update quiz settings
    const updatedQuiz = {
      ...quiz,
      questionCount,
      difficulty,
      questionTypes
    };
    
    saveCurrentQuiz(updatedQuiz);
    setIsLoading(true);
    
    try {
      let generatedQuiz;
      
      if ('pdfFileName' in quiz && 'pdfFileType' in quiz) {
        // Generate quiz from PDF stored in sessionStorage
        const base64File = sessionStorage.getItem('quizify-pdf-file');
        
        if (!base64File) {
          throw new Error("PDF file not found. Please upload the file again.");
        }
        
        // Convert base64 to Blob, then to File
        const fetchResponse = await fetch(base64File);
        const fileBlob = await fetchResponse.blob();
        const file = new File(
          [fileBlob], 
          quiz.pdfFileName as string, 
          { type: quiz.pdfFileType as string }
        );
        
        console.log("Restored PDF from sessionStorage:", { 
          name: file.name, 
          size: file.size, 
          type: file.type 
        });
        
        generatedQuiz = await generateQuizFromPDF(
          file,
          questionCount,
          questionTypes as ("multipleChoice" | "trueFalse" | "shortAnswer")[],
          difficulty
        );
      } else {
        // Generate quiz from topic
        generatedQuiz = await generateQuizFromTopic(
          quiz.topic,
          questionCount,
          questionTypes,
          difficulty
        );
      }
      
      // Save the generated quiz with questions
      saveCurrentQuiz({
        ...updatedQuiz,
        questions: generatedQuiz.questions
      });
      
      // Redirect to the quiz
      setLocation(`/quiz/${quiz.id}`);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      toast({
        title: "Failed to generate quiz",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!quiz) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Quiz</h1>
            
            <div className="space-y-6">
              {/* Quiz Topic Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <i className="ri-file-list-3-line text-xl text-primary"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Quiz Topic</h3>
                    <p className="text-sm text-gray-600">{quiz.topic}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-sm text-primary hover:text-primary/80"
                    onClick={handleBack}
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <Label htmlFor="question-count" className="block text-sm font-medium text-gray-700">
                  Number of Questions
                </Label>
                <div className="mt-1 flex items-center">
                  <Slider
                    id="question-count"
                    min={5}
                    max={30}
                    step={1}
                    value={[questionCount]}
                    onValueChange={([value]) => setQuestionCount(value)}
                    className="w-full"
                  />
                  <span className="ml-3 text-sm text-gray-700 min-w-[40px]">
                    {questionCount}
                  </span>
                </div>
              </div>

              {/* Question Types */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">Question Types</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiple-choice"
                      checked={questionTypes.includes("multipleChoice")}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleQuestionTypeChange("multipleChoice", checked);
                        }
                      }}
                    />
                    <Label htmlFor="multiple-choice" className="font-medium text-gray-700">
                      Multiple Choice
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="true-false"
                      checked={questionTypes.includes("trueFalse")}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleQuestionTypeChange("trueFalse", checked);
                        }
                      }}
                    />
                    <Label htmlFor="true-false" className="font-medium text-gray-700">
                      True/False
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="short-answer"
                      checked={questionTypes.includes("shortAnswer")}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          handleQuestionTypeChange("shortAnswer", checked);
                        }
                      }}
                    />
                    <Label htmlFor="short-answer" className="font-medium text-gray-700">
                      Short Answer
                    </Label>
                  </div>
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">Difficulty Level</Label>
                <RadioGroup 
                  value={difficulty} 
                  onValueChange={(value) => setDifficulty(value as "easy" | "medium" | "hard")}
                  className="mt-2 grid grid-cols-3 gap-3"
                >
                  <div className="flex items-center">
                    <RadioGroupItem id="easy" value="easy" className="sr-only peer" />
                    <Label
                      htmlFor="easy"
                      className="flex justify-center items-center py-3 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      Easy
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem id="medium" value="medium" className="sr-only peer" />
                    <Label
                      htmlFor="medium"
                      className="flex justify-center items-center py-3 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem id="hard" value="hard" className="sr-only peer" />
                    <Label
                      htmlFor="hard"
                      className="flex justify-center items-center py-3 px-4 text-sm font-medium text-gray-900 bg-white rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                    >
                      Hard
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-5 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleGenerateQuiz}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    "Generate Quiz"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizCustomization;
