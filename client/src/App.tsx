import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import HowItWorks from "@/pages/HowItWorks";
import CreateQuiz from "@/pages/CreateQuiz";
import QuizCustomization from "@/pages/QuizCustomization";
import TakeQuiz from "@/pages/TakeQuiz";
import QuizResults from "@/pages/QuizResults";
import QuizHistory from "@/pages/QuizHistory";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/create" component={CreateQuiz} />
          <Route path="/customize" component={QuizCustomization} />
          <Route path="/quiz/:id" component={TakeQuiz} />
          <Route path="/results/:id" component={QuizResults} />
          <Route path="/history" component={QuizHistory} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
