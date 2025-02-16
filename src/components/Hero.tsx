import React, { useRef, useState, useEffect } from "react";
import { FRICTION, SENSITIVITY, VELOCITY_THRESHOLD,CARD_CONTENT,PROJECT_CARDS } from "./constants";
import { ProjectCard } from "./ProjectCard";



function Hero() {
  // Starea și logica pentru cardul About
  const [rotation, setRotation] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  const dragging = useRef<boolean>(false);
  const lastX = useRef<number | null>(null);
  const velocity = useRef<number>(0);
  const animationFrame = useRef<number | null>(null);
  const dragged = useRef<boolean>(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragged.current = false;
    lastX.current = e.clientX;
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || lastX.current === null) return;
    const deltaX = e.clientX - lastX.current;
    if (Math.abs(deltaX) > 2) {
      dragged.current = true;
    }
    const deltaRotation = deltaX * SENSITIVITY;
    setRotation((prev) => prev + deltaRotation);
    velocity.current = deltaRotation;
    lastX.current = e.clientX;
  };

  const onPointerUp = () => {
    dragging.current = false;
    lastX.current = null;
    startInertia();
  };

  const startInertia = () => {
    const step = () => {
      velocity.current *= FRICTION;
      if (Math.abs(velocity.current) < VELOCITY_THRESHOLD) {
        velocity.current = 0;
        return;
      }
      setRotation((prev) => prev + velocity.current);
      animationFrame.current = requestAnimationFrame(step);
    };
    animationFrame.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const effectiveRotation = rotation + (flipped ? 180 : 0);

  const handleClick = () => {
    if (!dragged.current) {
      const R = rotation + (flipped ? 180 : 0);
      const newFlipped = !flipped;
      const shift = newFlipped ? 180 : 0;
      const target = Math.round((R - shift) / 360) * 360 + shift;
      const newRotation = target - (newFlipped ? 180 : 0);
      setRotation(newRotation);
      setFlipped(newFlipped);
    }
  };

  return (
    <div className="about-section">
      <h2>Denis Vlas</h2>
      <p>Software Enveloper</p>
      <br />
      {/* Cardul About */}
      <div
        className="about-card"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ cursor: dragging.current ? "grabbing" : "grab" }}
      >
        <div
          className="about-card-inner"
          onClick={handleClick}
          style={{
            transform: `rotateY(${effectiveRotation}deg)`,
            transition: dragging.current ? "none" : "transform 0.1s ease-out",
          }}
        >
          <div className="about-card-face about-front">
            <div className="profile-image">
              {CARD_CONTENT.front.profileImage}
            </div>
            <div className="click-text">{CARD_CONTENT.front.text}</div>
          </div>
          <div className="about-card-face about-back">
            <div className="about-content">
              <div className="skills-section">
                <h3>{CARD_CONTENT.back.skills.frontend.title}</h3>
                <div className="skills-grid">
                  {CARD_CONTENT.back.skills.frontend.items.map((skill) => (
                    <div key={skill} className="skill-item">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="skills-section">
                <h3>{CARD_CONTENT.back.skills.backend.title}</h3>
                <div className="skills-grid">
                  {CARD_CONTENT.back.skills.backend.items.map((skill) => (
                    <div key={skill} className="skill-item">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="skills-section">
                <h3>{CARD_CONTENT.back.skills.tools.title}</h3>
                <div className="skills-grid">
                  {CARD_CONTENT.back.skills.tools.items.map((skill) => (
                    <div key={skill} className="skill-item">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="contact-links">
                {CARD_CONTENT.back.contact.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cardurile de proiect */}
        <div className="cards-container">
          {PROJECT_CARDS.map((card, idx) => (
            <ProjectCard key={idx} card={card} />
          ))}
        </div>
    </div>
  );
}

export default Hero;
