
const SENSITIVITY = 0.5;
const FRICTION = 0.97;
const VELOCITY_THRESHOLD = 0.1;

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
    icon: "🚀",
    frontTitle: "Web App",
    frontText: "Aplicație full-stack cu funcționalități avansate",
    backTitle: "Smart Analytics Platform",
    backText:
      "O platformă de analiză a datelor în timp real folosind tehnologii moderne.",
    skills: ["React", "Node.js", "MongoDB"],
    projectUrl: "#",
    likes:0
    // videoUrl:"https://www.youtube.com/watch?v=HN8JLgExo40"
  },
  {
    id:"2",
    icon: "📱",
    frontTitle: "Mobile App",
    frontText: "Aplicație mobilă cross-platform",
    backTitle: "Lifestyle Tracker",
    backText:
      "Aplicație pentru monitorizarea activităților zilnice și obiectivelor personale.",
    skills: ["Flutter", "Firebase", "GraphQL"],
    projectUrl: "#",
    likes:0
    // videoUrl:"https://www.youtube.com/watch?v=8WrY1oDpbXk"
  },
  {
    id:"3",
    icon: "🤖",
    frontTitle: "AI Project",
    frontText: "Implementare de machine learning",
    backTitle: "AI Assistant",
    backText:
      "Bot inteligent pentru automatizarea sarcinilor și asistență în timp real.",
    skills: ["Python", "TensorFlow", "NLP"],
    projectUrl: "#",
    likes:0
    // videoUrl:"https://www.youtube.com/watch?v=8WrY1oDpbXk"

  },
];


export { SENSITIVITY, FRICTION, VELOCITY_THRESHOLD, CARD_CONTENT, PROJECT_CARDS };