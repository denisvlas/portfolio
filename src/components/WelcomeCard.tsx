// import { useState, useEffect } from "react";
import { assets } from "../config";

function WelcomeCard() {
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsVisible(false);
  //   }, 3000); // Adjust timing as needed (3000ms = 3 seconds)

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!isVisible)
     return null;

  return (
    <div className={`welcome-card`}>
      <img src={assets.images.profile} alt="" />
    </div>
  );
}

export default WelcomeCard;
