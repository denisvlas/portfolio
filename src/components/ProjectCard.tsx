

import { useState } from "react";
import { PROJECT_CARDS } from "./constants";

export function ProjectCard({ card }: { card: (typeof PROJECT_CARDS)[0] }) {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleClick = () => {
    setFlipped(!flipped);
    console.log("flipped", flipped);
    
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className="card-inner"
        style={{
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <div className="card-face card-front">
          <h2>{card.frontTitle}</h2>
          <div className="card-description">
            {/* <p>{card.frontText}</p> */}
            <p>{card.backText}</p>

          </div>
          <div className="skills">
            {card.skills.map((skill, i) => (
              <span key={i} className="skill-item">
                {skill}
              </span>
            ))}
          </div>
          <button className="project-btn">See Project</button>
        </div>
        <div className="card-face card-back">
          {/* <iframe
            width="100%"
            height="100%"
            src={"src\\assets\\image.jpg"}
            title={card.frontTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> */}
          denis hasn't implemented this yet, mai asteptam
          <i className="bi bi-hourglass-split"></i>
        </div>
      </div>
    </div>
  );
}
