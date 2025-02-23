
// import { useEffect, useState } from "react";
// import { PROJECT_CARDS } from "./constants";
// import {
//   doc,
//   updateDoc,
//   increment,
//   setDoc,
//   getDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { db, auth } from "../../firestore";
// import { signInAnonymously } from "firebase/auth";

// export function ProjectCard({ card }: { card: (typeof PROJECT_CARDS)[0] }) {
//   const [flipped, setFlipped] = useState<boolean>(false);
//   const [liked, setLiked] = useState<boolean>(false);
//   const [likes, setLikes] = useState<number>(card.likes || 0);

//   // Message states
//   const [askLike, setAskLike] = useState<boolean>(false);
//   const [hasAskedLike, setHasAskedLike] = useState<boolean>(false);
//   const [thankYou, setThankYou] = useState<boolean>(false);
//   const [hasShownThankYou, setHasShownThankYou] = useState<boolean>(false);

//   useEffect(() => {
//     const initializeProject = async () => {
//       if (!auth.currentUser) {
//         await signInAnonymously(auth);
//       }
//       const projectRef = doc(db, "projects", card.id);
//       const docSnap = await getDoc(projectRef);

//       if (!docSnap.exists()) {
//         await setDoc(projectRef, {
//           id: card.id,
//           title: card.frontTitle,
//           likes: 0,
//           likedBy: [],
//         });
//       } else {
//         const data = docSnap.data();
//         setLikes(data.likes || 0);
//         if (auth.currentUser && data.likedBy?.includes(auth.currentUser.uid)) {
//           setLiked(true);
//         }
//       }
//     };

//     initializeProject().catch(console.error);
//   }, [card.id, card.frontTitle]);

//   const handleClick = () => {
//     const newFlipped = !flipped;
//     setFlipped(newFlipped);
//     console.log("flipped", newFlipped);

//     // When the card flips and the user hasn't liked it,
//     // show the "Do you like this project?" message only once.
//     if (newFlipped && !liked && !hasAskedLike) {
//       setAskLike(true);
//       setHasAskedLike(true);
//       // Hide ask-like message after 5 seconds
//       setTimeout(() => setAskLike(false), 5000);
//     }
//   };

//   const toggleLike = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!auth.currentUser) {
//       console.error("User not authenticated");
//       return;
//     }

//     try {
//       const projectRef = doc(db, "projects", card.id);
//       const userId = auth.currentUser.uid;

//       if (!liked) {
//         await updateDoc(projectRef, {
//           likes: increment(1),
//           likedBy: arrayUnion(userId),
//         });
//         setLikes((prev) => prev + 1);
//         setLiked(true);
//         // If ask-like message is showing, hide it
//         if (askLike) {
//           setAskLike(false);
//         }
//         // Immediately show Thank You when liked for the first time
//         if (!hasShownThankYou) {
//           setThankYou(true);
//           setHasShownThankYou(true);
//           setTimeout(() => setThankYou(false), 4000);
//         }
//       } else {
//         await updateDoc(projectRef, {
//           likes: increment(-1),
//           likedBy: arrayRemove(userId),
//         });
//         setLikes((prev) => prev - 1);
//         setLiked(false);
//       }
//     } catch (error) {
//       console.error("Error updating likes:", error);
//     }
//   };

//   return (
//     <div className="card" onClick={handleClick}>
//       {askLike && flipped && (
//         <div className="ask-like">
//           Do you like this project?
//         </div>
//       )}
//       {thankYou && flipped && (
//         <div className="ask-like">
//           Thank you for your like!
//         </div>
//       )}
//       <div
//         className="card-inner"
//         style={{
//           transform: `rotateY(${flipped ? 180 : 0}deg)`,
//           transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//         }}
//       >
//         <div className="card-face card-front">
//           <h2>{card.frontTitle}</h2>
//           <div className="card-description">
//             <p>{card.backText}</p>
//           </div>
//           <div className="skills">
//             {card.skills.map((skill, i) => (
//               <span key={i} className="skill-item">
//                 {skill}
//               </span>
//             ))}
//           </div>
//           <button className="project-btn">See Project</button>
//         </div>
//         <div className="card-face card-back">
//           denis hasn't implemented this yet, mai asteptam
//           <div className="likes-container">
//             {likes > 0 && <span className="likes">{likes}</span>}
//             <i
//               className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}
//               onClick={(e) => toggleLike(e)}
//             ></i>
//           </div>
//           <i className="bi bi-hourglass-split"></i>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { PROJECT_CARDS } from "./constants";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../firestore";
import { signInAnonymously } from "firebase/auth";
import confetti from "canvas-confetti";

export function ProjectCard({ card }: { card: (typeof PROJECT_CARDS)[0] }) {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(card.likes || 0);

  // Message states
  const [askLike, setAskLike] = useState<boolean>(false);
  const [hasAskedLike, setHasAskedLike] = useState<boolean>(false);
  const [thankYou, setThankYou] = useState<boolean>(false);
  const [hasShownThankYou, setHasShownThankYou] = useState<boolean>(false);

  useEffect(() => {
    const initializeProject = async () => {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      const projectRef = doc(db, "projects", card.id);
      const docSnap = await getDoc(projectRef);

      if (!docSnap.exists()) {
        await setDoc(projectRef, {
          id: card.id,
          title: card.frontTitle,
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
  }, [card.id, card.frontTitle]);

  const handleClick = () => {
    const newFlipped = !flipped;
    setFlipped(newFlipped);
    console.log("flipped", newFlipped);

    // When the card flips and the user hasn't liked it,
    // show the "Do you like this project?" message only once.
    if (newFlipped && !liked && !hasAskedLike) {
      setAskLike(true);
      setHasAskedLike(true);
      // Hide ask-like message after 5 seconds
      setTimeout(() => setAskLike(false), 5000);
    }
  };

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }

    try {
      const projectRef = doc(db, "projects", card.id);
      const userId = auth.currentUser.uid;

      if (!liked) {
        await updateDoc(projectRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
        });
        setLikes((prev) => prev + 1);
        setLiked(true);
        // If ask-like message is showing, hide it immediately
        if (askLike) {
          setAskLike(false);
        }
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

  return (
    <div className="card" onClick={handleClick}>
      {askLike && flipped && (
        <div className="ask-like">
          Do you like this project?
        </div>
      )}
      {thankYou && flipped && (
        <div className="ask-like">
          Thank you for your like!
        </div>
      )}
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
          denis hasn't implemented this yet, mai asteptam
          <div className="likes-container">
            {likes > 0 && <span className="likes">{likes}</span>}
            <i
              className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`}
              onClick={(e) => toggleLike(e)}
            ></i>
          </div>
          <i className="bi bi-hourglass-split"></i>
        </div>
      </div>
    </div>
  );
}