import { useState } from "react";
import Hero from "./components/Hero";
import ChatWindow from "./components/ChatWindow";
import { PROJECT_CARDS } from "./components/constants";
import { ProjectCard } from "./components/ProjectCard";

function App() {
  // const [showWelcome, setShowWelcome] = useState(false);
  // const [showHero, setShowHero] = useState(false);
  const [showChat, setShowChat] = useState(false);
  // useEffect(() => {
  //   const showTimeout = setTimeout(() => {
  //     setShowWelcome(true);
  //   }, 0);

  //   const hideTimeout = setTimeout(() => {
  //     setShowWelcome(false);
  //     setTimeout(() => {
  //       setShowHero(true);
  //     }, 1000); // Delay to ensure transition completes
  //   }, 3000);

  //   return () => {
  //     clearTimeout(showTimeout);
  //     clearTimeout(hideTimeout);
  //   };
  // }, []);

  return (
    <div className="App">
      {showChat && <ChatWindow setShowChat={setShowChat} />}
      <div className={`hero-container  visible`}>
        <Hero setShowChat={setShowChat} />
        <section>
          <h2 className="projects-title">Projects</h2>
          <div className="cards-container">
            {PROJECT_CARDS.map((card, idx) => (
              <ProjectCard key={idx} card={card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
