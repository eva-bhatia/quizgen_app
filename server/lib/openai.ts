import OpenAI from "openai";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Manually load environment variables
dotenv.config();

// Log to help debug environment variable loading
console.log(`OpenAI API Key configured: ${process.env.OPENAI_API_KEY ? 'Yes' : 'No'}`);

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Generate a quiz based on a topic or PDF content
export async function generateQuiz(
  content: string,
  questionCount: number,
  questionTypes: string[],
  difficulty: string,
  isFromPdf: boolean = false
) {
  try {
    const prompt = createQuizPrompt(content, questionCount, questionTypes, difficulty, isFromPdf);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a quiz generation expert. Your task is to create high-quality, educational quiz questions based on the provided content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });
    
    const result = JSON.parse(response.choices[0].message.content);
    
    // Process the questions to ensure they have proper IDs
    const processedQuestions = result.questions.map(question => ({
      ...question,
      id: uuidv4(),
      options: question.options.map(option => ({
        id: uuidv4(),
        text: option
      }))
    }));
    
    return {
      ...result,
      questions: processedQuestions
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate quiz: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

// Create a prompt for quiz generation
function createQuizPrompt(
  content: string,
  questionCount: number,
  questionTypes: string[],
  difficulty: string,
  isFromPdf: boolean
) {
  const contentType = isFromPdf ? "PDF document" : "topic";
  const questionTypeDesc = questionTypes.join(", ").replace(/([A-Z])/g, ' $1').toLowerCase();
  
  let prompt = `Please generate a quiz based on the following ${contentType}. 
  
The quiz should:
- Have exactly ${questionCount} questions
- Be at ${difficulty} difficulty level
- Include question types: ${questionTypeDesc}
- Each question should have a detailed explanation of the answer

${isFromPdf ? `Here's the content extracted from the PDF: 

${content.substring(0, 6000)}` : `The topic is: ${content}`}

The response should be a valid JSON object with the following structure:
{
  "title": "Quiz title related to the content",
  "questions": [
    {
      "questionText": "The question text",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"], // For multiple choice questions
      "correctAnswer": "The correct answer exactly as it appears in options",
      "explanation": "Detailed explanation of why this is the correct answer",
      "type": "multipleChoice" // One of: multipleChoice, trueFalse, or shortAnswer
    }
  ]
}

For trueFalse questions, options should be ["True", "False"].
For shortAnswer questions, provide the exact expected answer in correctAnswer.

Important:
- Keep language clear and concise
- Ensure all questions are factually accurate
- Make sure the correctAnswer exactly matches one of the options
- For shortAnswer questions, keep answers concise (1-3 words) to make evaluation easier
- Focus on the most important concepts from the ${contentType}
- Make sure explanations are educational and provide context

Please generate a complete, well-formatted JSON response with exactly ${questionCount} questions.`;

  return prompt;
}
