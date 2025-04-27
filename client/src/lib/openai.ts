import { apiRequest } from './queryClient';

// Function to generate a quiz based on a topic
export async function generateQuizFromTopic(
  topic: string,
  questionCount: number,
  questionTypes: string[],
  difficulty: string
) {
  try {
    const response = await apiRequest('POST', '/api/quiz/generate', {
      topic,
      questionCount,
      questionTypes,
      difficulty
    });
    const data = await response.json();
    
    // Format the quiz data for client-side use
    return formatQuizForClient(data);
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}

// Function to generate a quiz from an uploaded PDF
export async function generateQuizFromPDF(
  file: File,
  questionCount: number,
  questionTypes: string[],
  difficulty: string
) {
  try {
    console.log("Starting PDF upload:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      questionCount,
      questionTypes,
      difficulty
    });
    
    const formData = new FormData();
    // Make sure the file is properly attached with "file" field name
    formData.append('file', file, file.name);
    formData.append('questionCount', questionCount.toString());
    formData.append('questionTypes', JSON.stringify(questionTypes));
    formData.append('difficulty', difficulty);
    
    // Log the FormData entries for debugging
    console.log("FormData contains file:", formData.has('file'));

    const response = await fetch('/api/quiz/generate-from-pdf', {
      method: 'POST',
      body: formData,
      // Don't set content-type header, browser will set it with boundary
      credentials: 'include',
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => response.text());
      console.error("PDF upload response error:", errorBody);
      
      if (typeof errorBody === 'object' && errorBody.message) {
        throw new Error(errorBody.message);
      } else if (typeof errorBody === 'string') {
        throw new Error(errorBody || response.statusText);
      } else {
        throw new Error(response.statusText);
      }
    }

    const data = await response.json();
    console.log("PDF quiz generation successful:", data);
    
    // Format the quiz data for client-side use
    return formatQuizForClient(data);
  } catch (error) {
    console.error('Error generating quiz from PDF:', error);
    throw error;
  }
}

// Function to fetch a quiz by ID from the database
export async function getQuizById(id: number) {
  try {
    const response = await apiRequest('GET', `/api/quiz/${id}`, null);
    const data = await response.json();
    
    // Format the quiz data for client-side use
    return formatQuizForClient(data);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw error;
  }
}

// Helper function to format quiz data for client-side use
function formatQuizForClient(quizData: any) {
  // Format questions to match the client-side expected format
  const formattedQuestions = quizData.questions.map((question: any) => {
    // If options is a JSON string, parse it
    let options = question.options;
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (e) {
        console.error('Error parsing options JSON:', e);
      }
    }
    
    // Return the formatted question object
    return {
      id: question.id.toString(),
      questionText: question.questionText,
      options: Array.isArray(options) 
        ? options.map((opt: any, index: number) => ({
            id: typeof opt === 'string' ? `option-${index}` : opt.id,
            text: typeof opt === 'string' ? opt : opt.text
          }))
        : [],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      type: question.type
    };
  });
  
  // Return the formatted quiz object
  return {
    id: quizData.id.toString(),
    title: quizData.title,
    topic: quizData.topic,
    questionCount: quizData.questionCount,
    difficulty: quizData.difficulty,
    questionTypes: quizData.questionTypes,
    createdAt: quizData.createdAt,
    questions: formattedQuestions
  };
}
