import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to handle visibility based on scroll position and direction
    const handleVisibility = () => {
      if (scrollY < 50) {
        setIsVisible(true);
      } else if (scrollDirection === 'up') {
        setIsVisible(true);
      } else if (scrollDirection === 'down') {
        setIsVisible(false);
      }
    };
    
    // Call initially and set up a listener
    handleVisibility();
    
    // We don't need a cleanup function since we're not adding event listeners here
  }, [scrollDirection, scrollY]);

  const links = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
    { name: "My Quizzes", href: "/history" }
  ];
  
  return (
    <header 
      className={cn(
        "bg-primary/10 shadow-sm sticky top-0 z-50 transition-transform duration-300", 
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <i className="ri-brain-line text-primary text-3xl mr-2"></i>
              <span className="text-2xl font-bold text-primary">Quizify</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {links.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`${
                  location === link.href 
                    ? "text-primary font-medium" 
                    : "text-gray-600 hover:text-primary font-medium"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/create">
              <Button className="bg-primary hover:bg-primary/90">
                Create a Quiz
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px]">
                <div className="flex flex-col h-full">
                  <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                  <div className="mt-12 flex flex-col space-y-4">
                    {links.map(link => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        className={`px-2 py-1 rounded-md ${
                          location === link.href 
                            ? "text-primary font-medium bg-primary/10" 
                            : "text-gray-600 hover:text-primary font-medium"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link href="/create" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Create a Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
