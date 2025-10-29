import { useParams, Link } from "react-router-dom";
import { PROJECT_CARDS } from "./constants";
import "./ProjectPage.css";
import { useState, useEffect, useRef } from "react";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth, firebaseEnabled } from "../../firestore";
import { signInAnonymously } from "firebase/auth";
import confetti from "canvas-confetti";
import Slideshow from "./Slideshow";

export function ProjectPage() {
  const { projectName } = useParams<{ projectName: string }>();
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [thankYou, setThankYou] = useState<boolean>(false);
  const [hasShownThankYou, setHasShownThankYou] = useState<boolean>(false);

  // Găsește proiectul după slug (nume formatat pentru URL)
  const project = PROJECT_CARDS.find(
    (card) => card.frontTitle.toLowerCase().replace(/\s+/g, "-") === projectName
  );

  useEffect(() => {
    const initializeProject = async () => {
      if (!project) return;
      if (!firebaseEnabled) return;

      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      const projectRef = doc(db, "projects", project.id);
      const docSnap = await getDoc(projectRef);

      if (!docSnap.exists()) {
        await setDoc(projectRef, {
          id: project.id,
          title: project.frontTitle,
          likes: 0,
          likedBy: [],
        });
      } else {
        const data = docSnap.data();
        setLikes(data.likes || 0);
        if (auth.currentUser && data.likedBy?.includes(auth.currentUser.uid)) {
          setLiked(true);
        }
      }
    };

    initializeProject().catch(console.error);
  }, [project]);

  const toggleLike = async () => {
    if (!project || !firebaseEnabled || !auth.currentUser) {
      console.error("User not authenticated or project not found");
      return;
    }

    try {
      const projectRef = doc(db, "projects", project.id);
      const userId = auth.currentUser.uid;

      if (!liked) {
        await updateDoc(projectRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
        });
        setLikes((prev) => prev + 1);
        setLiked(true);

        // Immediately show "Thank you" message once and fire confetti
        if (!hasShownThankYou) {
          setThankYou(true);
          setHasShownThankYou(true);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          setTimeout(() => setThankYou(false), 4000);
        }
      } else {
        await updateDoc(projectRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId),
        });
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <Link to="/" className="back-link">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-page" ref={topRef}>
      {/* Buton de navigare înapoi */}
      <Link to="/" className="back-link">
        <i className="bi bi-arrow-left"></i> Back to Projects
      </Link>

      {/* Titlul proiectului și like button */}
      <div className="project-header">
        <h1 className="project-title">{project.frontTitle}</h1>
        <div className="project-likes">
          <button
            className="like-button"
            onClick={toggleLike}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}></i>
          </button>
          {likes > 0 && <span className="likes-count">{likes}</span>}
        </div>
      </div>

      {/* Thank you message */}
      {thankYou && (
        <div className="thank-you-message">Thank you for your like!</div>
      )}

      {/* Secțiunea video sau slideshow */}
      <div className="project-video-section">
        {project.slides && project.slides.length > 0 ? (
          <Slideshow images={project.slides} />
        ) : (
          <div className="project-video-container">
            {!project.videoUrl && project.slides && (
              <div className="video-placeholder empty">
                <i className="bi bi-camera-video"></i>
                <p>Video demo will be available soon</p>
              </div>
            )}

            {project.videoUrl && (
              <div className="video-wrapper">
                <div
                  style={
                    project.isHorizontalVideo
                      ? { paddingBottom: "56.25%" }
                      : { paddingBottom: "177.78%" }
                  }
                  className="video-aspect-ratio"
                >
                  <iframe
                    src={`${project.videoUrl}&autoplay=1&playerVars=modestbranding=1&showinfo=0&controls=1&portrait=1&chrome=0&iv_load_policy=3&playsinline=1&fs=0&rel=0&enablejsapi=1`}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Descrierea proiectului */}
      <div className="project-description">
        <h2>Description</h2>
        <p>{project.description}</p>
      </div>

      {/* Tehnologiile folosite */}

      {/* Problema pe care o rezolvă */}
      <div className="project-problem">
        <h2>Problem Solved</h2>
        <p>{project.problemSolved} </p>
      </div>

      {/* Tehnologii și aspecte tehnice */}
      {project.technicalHighlights && (
        <div className="project-technical">
          <h2>Technical Highlights</h2>
          <p>{project.technicalHighlights}</p>
        </div>
      )}
      {/* Detalii despre fluxul de lucru */}
      {project.workflowDetails && (
        <div className="project-workflow">
          <h2>
            {project.beWorkflow ? "Frontend Workflow" : "Workflow Details"}
          </h2>
          <ul>
            {project.workflowDetails.split("→").map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Backend Workflow */}
      {project.beWorkflow && (
        <div className="project-backend-workflow">
          <h2>Backend Workflow</h2>
          <ul>
            {project.beWorkflow.split("→").map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Model Training Details */}
      {project.modelTraining && (
        <div className="project-model-training">
          <h2>Model Training</h2>
          <p>{project.modelTraining}</p>
        </div>
      )}
      <div className="project-skills">
        <h2>Tech Stack</h2>
        <div className="skills-container">
          {project.skills.map((skill, index) => (
            <span key={index} className="skill-item">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* Footer cu link-uri către proiect */}
      {project.githubLink ||
        (project.liveLink && (
          <div className="project-footer">
            {(project.githubLink || project.liveLink) && <h2>View Project</h2>}
            <div className="project-links">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <i className="bi bi-github"></i> GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <i className="bi bi-globe"></i> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
