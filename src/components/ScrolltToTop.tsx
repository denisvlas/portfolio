import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    console.log("Scrolling to top");
    
    // Immediate scroll - first attempt
    window.scrollTo(0, 0);
    
    // Second attempt with requestAnimationFrame
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    
    // Third attempt with a slight delay as fallback
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  
  return null;
}