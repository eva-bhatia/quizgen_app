import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    // Use a ref to keep track of the current scroll direction without triggering re-renders
    const currentDirection = { current: scrollDirection };

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== currentDirection.current && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        currentDirection.current = direction;
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    
    window.addEventListener('scroll', updateScrollDirection);
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return { scrollDirection, scrollY };
}