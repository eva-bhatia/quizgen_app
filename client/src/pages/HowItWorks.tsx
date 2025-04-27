import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h1>
          <p className="mt-4 text-xl text-gray-600">Create and take quizzes in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Enter a Topic or Upload Content</h3>
              <p className="text-gray-600">
                Start by selecting a topic for your quiz or upload a PDF document to generate questions from.
                Our AI will analyze the content and create relevant questions.
              </p>
            </div>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img
                src="https://placehold.co/600x400/e2e8f0/475569?text=Enter+Topic"
                alt="Step 1: Enter a topic"
                className="h-full w-full object-cover"
              />
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Customize Your Quiz</h3>
              <p className="text-gray-600">
                Choose the number of questions, question types (multiple choice, true/false, short answer),
                and difficulty level to tailor your quiz exactly to your needs.
              </p>
            </div>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img
                src="https://placehold.co/600x400/e2e8f0/475569?text=Customize+Quiz"
                alt="Step 2: Customize your quiz"
                className="h-full w-full object-cover"
              />
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Take Your Quiz & See Results</h3>
              <p className="text-gray-600">
                Answer the questions at your own pace, then review your score, correct answers,
                and detailed explanations. All your quiz history is saved for future reference.
              </p>
            </div>
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img
                src="https://placehold.co/600x400/e2e8f0/475569?text=Quiz+Results"
                alt="Step 3: See your results"
                className="h-full w-full object-cover"
              />
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do I need to create an account?</h3>
              <p className="mt-2 text-gray-600">
                No, Quizify is designed to be used without any account creation or login. Your quiz history
                is stored locally on your device.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">What file formats can I upload?</h3>
              <p className="mt-2 text-gray-600">
                Currently, Quizify supports PDF document uploads. We plan to add support for more file formats 
                in the future.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">How are the quizzes generated?</h3>
              <p className="mt-2 text-gray-600">
                Quizify uses advanced AI models to analyze your topic or uploaded document and generate 
                relevant questions and answers. The questions are tailored to the difficulty level you select.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I save my quiz for later?</h3>
              <p className="mt-2 text-gray-600">
                Yes, all quizzes you create are automatically saved to your local quiz history. You can access
                them anytime from the "My Quizzes" section.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is there a limit to how many quizzes I can create?</h3>
              <p className="mt-2 text-gray-600">
                There's no limit to the number of quizzes you can create. However, since quiz history is
                stored locally on your device, clearing your browser data will remove your quiz history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
