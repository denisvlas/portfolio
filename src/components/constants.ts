
const SENSITIVITY = 0.5;
const FRICTION = 0.97;
const VELOCITY_THRESHOLD = 0.1;
import tgbotImage from '../assets/tgbotimg.jpg';

const CARD_CONTENT = {
  front: {
    profileImage: "👨‍💻",
    text: "Click to know me better",
  },
  back: {
    skills: {
      frontend: {
        title: "Tehnologii Frontend",
        items: ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "JavaScript"],
      },
      backend: {
        title: "Tehnologii Backend",
        items: ["Node.js", "Python", "MongoDB", "SQL", "Express", "REST API"],
      },
      tools: {
        title: "Tools & Others",
        items: ["Git", "Docker", "AWS", "CI/CD", "Agile", "Testing"],
      },
    },
    contact: [
      { url: "", label: "Email" },
      { url: "", label: "GitHub" },
      { url: "", label: "LinkedIn" },
    ],
  },
};

const PROJECT_CARDS = [
  {
    id:"1",
    icon: "🤖",
    frontTitle: "Telegram Ordering Bot",
    frontText: "Restaurant ordering via Telegram bot and web interface.",
    backTitle: "Interactive Restaurant Ordering System",
    description:"A full-stack solution enabling customers to order food without waiting for a waiter, by scanning a QR code. Orders are transmitted to a staff dashboard, providing information about the table, order details, phone number, date, and time. Staff can also update the order status. Built with React, TypeScript, Node.js, Express, and Firebase.",
    projectImg:tgbotImage,
    backText:"",
    skills: ["React", "TypeScript", "Node.js", "Express", "Firebase", "Telegram Bot API", "WebSockets", "REST API","ngrok",],
    projectUrl: "#",
    likes:0,
    liveLink:"",
    githubLink :"",
    problemSolved:"Streamlining the restaurant ordering process and improving order accuracy.",
    videoUrl:"https://player.cloudinary.com/embed/?public_id=emzt4r6knhpbklv9qwvh&cloud_name=dyrpdnkvs&profile=cld-default"
  },
];



export { SENSITIVITY, FRICTION, VELOCITY_THRESHOLD, CARD_CONTENT, PROJECT_CARDS };