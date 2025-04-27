import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Create <span className="text-primary">personalized quizzes</span> in seconds
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                No login required. Enter a topic, upload content, or choose from templates to instantly generate quizzes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/create">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                    Create Quiz Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25"></div>
                <div className="relative">
                  <img 
                    src="https://placehold.co/600x400/e2e8f0/475569?text=Create+Quizzes+Instantly" 
                    alt="Quiz creation illustration" 
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Create quizzes your way</h2>
            <p className="mt-4 text-xl text-gray-600">Simple, powerful, and ready in seconds</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <i className="ri-lightbulb-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Topic-Based</h3>
              <p className="text-gray-600">
                Simply enter any topic, and our AI will generate a complete, customized quiz for you instantly.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                <i className="ri-file-list-3-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Upload</h3>
              <p className="text-gray-600">
                Upload a PDF document and let our system extract key information to create targeted quizzes.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4">
                <i className="ri-settings-3-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-600">
                Choose question types, difficulty levels, and number of questions to match your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Ready to create your first quiz?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            No login required. Get started in seconds.
          </p>
          <Link href="/create">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Create a Quiz Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
