import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveCurrentQuiz } from "@/lib/localStorage";

const CreateQuiz = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [topic, setTopic] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your quiz",
        variant: "destructive"
      });
      return;
    }
    
    // Save current quiz settings to local storage
    saveCurrentQuiz({
      id: Date.now().toString(),
      title: `Quiz on ${topic}`,
      topic: topic,
      questionCount: 10, // Default
      difficulty: "medium", // Default
      questionTypes: ["multipleChoice"], // Default
      createdAt: new Date().toISOString()
    });
    
    setLocation("/customize");
  };

  const handleFileSubmit = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
      return;
    }
    
    // Store just the file name and content type for quiz metadata
    saveCurrentQuiz({
      id: Date.now().toString(),
      title: `Quiz on ${file.name.replace(".pdf", "")}`,
      topic: file.name.replace(".pdf", ""),
      questionCount: 10, // Default
      difficulty: "medium", // Default
      questionTypes: ["multipleChoice"], // Default
      createdAt: new Date().toISOString(),
      pdfFileName: file.name, // Store file name instead of file object
      pdfFileType: file.type // Store file type for validation
    });
    
    // Store the file in sessionStorage as base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64data = reader.result as string;
      sessionStorage.setItem('quizify-pdf-file', base64data);
      setLocation("/customize");
    };
    
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "Failed to process the PDF file. Please try again.",
        variant: "destructive"
      });
    };
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Create Your Quiz</h1>
          <p className="mt-4 text-xl text-gray-600">Choose how you want to generate your quiz</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Topic Based Option */}
          <Card className="shadow-md transition duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <i className="ri-lightbulb-line text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-center mb-4">Topic Based</h2>
              <p className="text-gray-600 text-center mb-6">
                Enter any topic and we'll generate a customized quiz for you.
              </p>
              
              <form className="space-y-4" onSubmit={handleTopicSubmit}>
                <div>
                  <Label htmlFor="topic">What's your quiz about?</Label>
                  <Input 
                    id="topic" 
                    placeholder="e.g. Ancient Rome, Quantum Physics" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Upload Based Option */}
          <Card className="shadow-md transition duration-300 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4 mx-auto">
                <i className="ri-file-upload-line text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold text-center mb-4">Upload Content</h2>
              <p className="text-gray-600 text-center mb-6">
                Upload a PDF document and we'll create a quiz based on its content.
              </p>
              
              <div className="space-y-4">
                <div 
                  className={`border-2 border-dashed rounded-md px-6 pt-5 pb-6 flex flex-col items-center ${
                    dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  
                  {file ? (
                    <div className="text-center">
                      <i className="ri-file-pdf-line text-3xl text-primary mb-2"></i>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        className="mt-2 text-sm text-primary hover:text-primary/80"
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex text-sm text-gray-600">
                        <Label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80"
                        >
                          <span>Upload a file</span>
                        </Label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>
                    </>
                  )}
                </div>
                
                <Button
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleFileSubmit}
                  disabled={!file || isUploading}
                >
                  {isUploading ? "Uploading..." : "Continue"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CreateQuiz;
