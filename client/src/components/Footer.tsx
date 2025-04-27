import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <i className="ri-brain-line text-white text-3xl mr-2"></i>
              <span className="text-2xl font-bold">Quizify</span>
            </div>
            <p className="text-blue-100 text-sm">
              Learn better. Study smarter. Generate quizzes on any topic in seconds.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4">Features</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/create" className="text-base text-blue-100 hover:text-white">
                  Quiz Creation
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-base text-blue-100 hover:text-white">
                  PDF Upload
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-base text-blue-100 hover:text-white">
                  Customization
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-base text-blue-100 hover:text-white">
                  Quiz History
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-base text-blue-100 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-base text-blue-100 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-blue-100 hover:text-white">
                  Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-400/30">
          <p className="text-base text-blue-100 text-center">
            &copy; {new Date().getFullYear()} Quizify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
