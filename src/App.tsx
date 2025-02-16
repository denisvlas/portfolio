import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import WelcomeCard from "./components/WelcomeCard";

function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowWelcome(true);
    }, 0);

    const hideTimeout = setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => {
        setShowHero(true);
      }, 1000); // Delay to ensure transition completes
    }, 3000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="App">
      <div
        className={`welcome-container ${showWelcome ? "visible" : "hidden"}`}
      >
        <WelcomeCard />
      </div>
      <div className={`hero-container ${showHero ? "visible" : "hidden"}`}>
        <Hero />
      </div>
    </div>
  );
}

export default App;
