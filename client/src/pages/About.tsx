const About = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">About Quizify</h1>
            <p className="mt-4 text-lg text-gray-700">
              Quizify is an AI-powered quiz generation platform I created to help students like me and teachers make personalized quizzes on any topic instantly.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              My goal is to make studying more fun and effective for students and to help teachers create quizzes quickly. With Quizify, you can:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex">
                <i className="ri-check-line text-primary text-xl flex-shrink-0"></i>
                <span className="ml-3 text-gray-700">Create quizzes from any topic or document</span>
              </li>
              <li className="flex">
                <i className="ri-check-line text-primary text-xl flex-shrink-0"></i>
                <span className="ml-3 text-gray-700">Customize difficulty levels and question types</span>
              </li>
              <li className="flex">
                <i className="ri-check-line text-primary text-xl flex-shrink-0"></i>
                <span className="ml-3 text-gray-700">Get detailed explanations for each answer</span>
              </li>
              <li className="flex">
                <i className="ri-check-line text-primary text-xl flex-shrink-0"></i>
                <span className="ml-3 text-gray-700">Track your progress over time</span>
              </li>
              <li className="flex">
                <i className="ri-check-line text-primary text-xl flex-shrink-0"></i>
                <span className="ml-3 text-gray-700">Use without creating an account</span>
              </li>
            </ul>
          </div>
          <div className="mt-10 lg:mt-0">
            <img 
              src="https://placehold.co/600x400/e2e8f0/475569?text=A+Student+Studying" 
              alt="A student studying" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
        
        {/* How Quizify Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">How Quizify Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                <i className="ri-brain-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">AI Helper</h3>
              <p className="text-gray-700">
                I use artificial intelligence to create questions and answers based on the topics you're studying. It's like having a smart study buddy!
              </p>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                <i className="ri-file-search-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Document Reader</h3>
              <p className="text-gray-700">
                You can upload your notes or textbook pages, and Quizify will read them to create quizzes specifically about what you're learning in class.
              </p>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/10">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 text-primary mb-4">
                <i className="ri-lock-line text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Easy to Use</h3>
              <p className="text-gray-700">
                No need to sign up! Just type in your topic or upload your notes, and in seconds you'll have a quiz ready to help you study better.
              </p>
            </div>
          </div>
        </div>
        
        {/* Education for All */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Education for All</h2>
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <i className="ri-global-line text-2xl"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-600 mb-4">Supporting Quality Education for Everyone</h3>
            <p className="text-gray-700 mb-4 text-center max-w-3xl mx-auto">
              Quizify was created with a mission to support equal access to quality education for all. Even in areas where schools might not have the best resources, students and teachers with internet access can use Quizify at a very low cost to create personalized learning materials.
            </p>
            <p className="text-gray-700 mb-4 text-center max-w-3xl mx-auto">
              By making Quizify accessible without requiring login, we're removing barriers to education and helping students in underserved communities get the study tools they need to succeed. This aligns with the United Nations' Sustainable Development Goal 4: Quality Education, which aims to ensure inclusive and equitable quality education for all.
            </p>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              We believe that every student deserves access to high-quality learning resources regardless of where they live or their economic circumstances. Technology can bridge educational gaps, and Quizify is our small contribution toward creating a more equitable learning environment worldwide.
            </p>
          </div>
        </div>
        
        {/* My Story */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">My Story</h2>
          <div className="bg-primary/5 p-8 rounded-lg border border-primary/10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="h-40 w-40 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden mb-3">
                  <i className="ri-user-smile-line text-primary text-7xl"></i>
                </div>
                <h3 className="text-lg font-medium text-primary">Eva</h3>
                <p className="text-sm text-gray-600 text-center">6th Grade Student<br/>Fairmont Private Schools</p>
              </div>
              <div className="md:w-3/4">
                <p className="text-gray-700 mb-4">
                  Hi! I'm Eva, a 12-year-old student in 6th grade at Fairmont Private Schools. I created Quizify because I was struggling to study for quizzes and tests. 
                </p>
                <p className="text-gray-700 mb-4">
                  One night when I was trying to prepare for a big history test, I found myself flipping through textbook pages, trying to guess what might be on the quiz. I thought, "Wouldn't it be amazing if there was a tool that could create practice quizzes for me based on what I'm studying?"
                </p>
                <p className="text-gray-700 mb-4">
                  That's how Quizify was born. I wanted to build something that would make studying easier and more effective for students like me. Now, I can simply input the topic I'm studying or upload my class notes, and get an instant practice quiz!
                </p>
                <p className="text-gray-700 mb-4">
                  Teachers can use it too! This tool makes it easy for them to create review quizzes without spending hours writing questions. I hope Quizify helps you as much as it's helped me with my studies!
                </p>
                <p className="text-gray-700">
                  I'm especially proud that Quizify can help students in places without good educational resources. Everyone deserves a chance to learn!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
