const SENSITIVITY = 0.5;
const FRICTION = 0.97;
const VELOCITY_THRESHOLD = 0.1;
import tgbotImage from "../assets/tgbotimg1.jpg";
import aiNewsImage from "../assets/aiNewsImage.jpg";
import priceParserImage from "../assets/parserimg2.jpg";
import brainImg from "../assets/brainTumor.jpg";
import supportChatImage from "../assets/assitantSupport.jpg";
import doccumentScannerImage from "../assets/doccumentScannerImage.png";
import newsBotImg1 from "../assets/news-bot-img/workflow_page-0001.jpg";
import newsBotImg2 from "../assets/news-bot-img/workflow_page-0002.jpg";
import newsBotImg3 from "../assets/news-bot-img/workflow_page-0003.jpg";
import newsBotImg4 from "../assets/news-bot-img/workflow_page-0004.jpg";
import newsBotImg5 from "../assets/news-bot-img/workflow_page-0005.jpg";
import newsBotImg6 from "../assets/news-bot-img/workflow_page-0006.jpg";
import newsBotImg7 from "../assets/news-bot-img/workflow_page-0007.jpg";
import newsBotImg8 from "../assets/news-bot-img/workflow_page-0008.jpg";
import newsBotImg9 from "../assets/news-bot-img/workflow_page-0009.jpg";
import newsBotImg10 from "../assets/news-bot-img/workflow_page-0010.jpg";
import newsBotImg11 from "../assets/news-bot-img/workflow_page-0011.jpg";
import brainTumorImage0 from "../assets/brain-tumor-img/output0.png";
import brainTumorImage1 from "../assets/brain-tumor-img/output1.png";
import brainTumorImage2 from "../assets/brain-tumor-img/output2.png";
import brainTumorImage3 from "../assets/brain-tumor-img/output3.png";
import brainTumorImage4 from "../assets/brain-tumor-img/output4.png";
import brainTumorImage5 from "../assets/brain-tumor-img/output5.png";
import brainTumorImage6 from "../assets/brain-tumor-img/output6.png";
import brainTumorImage7 from "../assets/brain-tumor-img/output7.png";
import brainTumorImage8 from "../assets/brain-tumor-img/output8.png";

const CARD_CONTENT = {
  front: {
    profileImage: "👨‍💻",
    text: "Click to know me better",
  },
  back: {
    skills: {
      frontend: {
        title: "Tehnologii Frontend",
        items: [
          "React",
          "TypeScript",
          "VITE",
          "CSS3",
          "JavaScript",
          "Responsive Design",
        ],
      },
      backend: {
        title: "Tehnologii Backend",
        items: [
          "Node.js",
          "Python",
          "Flask",
          "SQL",
          "Express",
          "REST API",
          "GraphQL",
          "Firebase",
          "Machine Learning",
          "Deep Learning",
          "Web Scraping",
          "AI Content Generation",
        ],
      },
      tools: {
        title: "Tools & Others",
        items: ["Git", "Docker", "Firebase", "VPS Hosting", "Agile", "Testing"],
      },
    },
    contact: [
      { url: "mailto:vlasdenis2008@gmail.com", label: "Email" },
      { url: "https://github.com/denisvlas", label: "GitHub" },
      {
        url: "https://www.linkedin.com/in/denisvlas/",
        label: "LinkedIn",
      },
      { url: "/portfolio/cv.pdf", label: "CV" },
    ],
  },
};

const PROJECT_CARDS = [
  {
    id: "1",
    icon: "🤖",
    frontTitle: "Telegram Ordering",
    frontText: "Restaurant ordering via Telegram bot and web interface.",
    backTitle: "Interactive Restaurant Ordering System",
    description:
      "A full-stack solution enabling customers to order food without waiting for a waiter, by scanning a QR code. Orders are transmitted to a staff dashboard, providing information about the table, order details, phone number, date, and time. Staff can also update the order status. Built with React, TypeScript, Node.js, Express, and Firebase.",
    projectImg: tgbotImage,
    backText: "",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Firebase",
      "Telegram Bot API",
      "WebSockets",
      "REST API",
      "ngrok",
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "",
    githubLink: "",
    problemSolved:
      "Streamlining the restaurant ordering process and improving order accuracy.",
    videoUrl:
      "https://player.cloudinary.com/embed/?public_id=0313_kzj2fz&cloud_name=dyrpdnkvs&profile=cld-default",
  },

  {
    id: "2",
    icon: "📰",
    frontTitle: "AI News Automation",
    frontText:
      "Automated Instagram news posting system with AI content generation.",
    backTitle: "AI-Powered News Aggregator & Publisher",
    description:
      "A fully automated system that extracts news articles from Moldovan sources, generates AI summaries and images, and posts them to Instagram on schedule. The system uses advanced anti-detection measures to simulate human behavior, prevents duplicate posts, and maintains cookie sessions. It runs autonomously via a startup script, requiring minimal human intervention for continuous operation.",
    projectImg: aiNewsImage, // Replace with your actual image variable
    backText: "",
    skills: [
      "Python",
      "AI Content Generation",
      "Web Scraping",
      "Instagram API",
      "LLM Integration",
      "Automation",
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "https://www.instagram.com/ainews.md/",
    githubLink: "",
    problemSolved:
      "Eliminating manual news aggregation and social media posting while avoiding platform detection measures.",
    workflowDetails:
      "1. Extract latest news from citesc.eu → 2. Generate AI summaries with Groq API → 3. Create AI images with Blinkshot → 4. Process images with custom templates → 5. Post to Instagram with human-like behavior → 6. Wait appropriate intervals between posts",
    technicalHighlights:
      "The system employs sophisticated anti-detection measures including randomized delays, user agent rotation, cookie persistence, and simulated human browsing behavior. It uses exponential backoff for error handling and dynamically adjusts posting frequency based on account history to maintain a natural posting pattern.",
    videoUrl: "", // Add video URL if available
    slides: [
      newsBotImg1,
      newsBotImg2,
      newsBotImg3,
      newsBotImg4,
      newsBotImg5,
      newsBotImg6,
      newsBotImg7,
      newsBotImg8,
      newsBotImg9,
      newsBotImg10,
      newsBotImg11,
    ],
  },
  {
    id: "3",
    icon: "💻",
    frontTitle: "Parser & Aggregator",
    frontText:
      "Multi-source product scraping and filtering system with real-time updates.",
    backTitle: "Multiplexed Web Scraper & Data Aggregation Platform",
    description:
      "A full-stack solution built with Flask, Selenium, and React that aggregates product data from multiple e-commerce websites. It scrapes data using advanced techniques, filters and sorts product information based on various criteria, and provides real-time progress updates via WebSocket. The frontend, built with React, TypeScript, and Vite, offers a responsive and intuitive interface for users to compare prices and product details.",
    projectImg: priceParserImage,
    backText: "",
    skills: [
      "Python",
      "Flask",
      "Selenium",
      "BeautifulSoup",
      "React",
      "TypeScript",
      "Vite",
      "Socket.IO",
      "WebSockets",
      "Docker",
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "",
    githubLink: "",
    problemSolved:
      "Streamlines the process of comparing product prices across multiple online stores by automating data extraction and filtering, enabling smarter purchase decisions.",
    videoUrl:
      "https://player.cloudinary.com/embed/?public_id=fzu1ndumfohmxovrmbex&cloud_name=dyrpdnkvs&profile=cld-default",
      

    isHorizontalVideo: true,
  },
  {
    id: "4",
    icon: "🧠",
    frontTitle: "Brain Tumor Segmentation",
    frontText:
      "AI-powered medical image segmentation for brain tumor detection.",
    backTitle: "Deep Learning Medical Image Analysis",
    description:
      "A U-Net based deep learning model that automatically segments brain tumors in medical images. The system processes MRI scans to precisely identify and outline tumor regions, providing valuable diagnostic assistance for medical professionals. The model uses a custom loss function combining binary cross-entropy and Dice coefficient to achieve high accuracy in identifying tumor boundaries.",
    projectImg: brainImg, // Replace with your actual image variable
    backText: "",
    skills: [
      "TensorFlow",
      "Python",
      "U-Net Architecture",
      "Image Segmentation",
      "Medical AI",
      "Convolutional Neural Networks",
      "Batch Normalization",
      "Custom Loss Functions",
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "",
    githubLink: "",
    problemSolved:
      "Automating the precise identification of brain tumor boundaries in medical images, reducing the time required for manual segmentation and potentially improving diagnostic accuracy.",
    workflowDetails:
      "1. Load and preprocess brain MRI images → 2. Create binary masks from annotation files → 3. Train U-Net model with custom loss function → 4. Evaluate model performance → 5. Visualize predictions against ground truth",
    technicalHighlights:
      "The system implements a U-Net architecture with batch normalization for improved training stability. It employs a custom combined loss function that balances pixel-wise accuracy (binary cross-entropy) with structural similarity (Dice coefficient). The model demonstrates strong performance in accurately identifying tumor boundaries in previously unseen brain scans.",
    videoUrl: "",
    slides: [
      brainTumorImage0,
      brainTumorImage1,
      brainTumorImage2,
      brainTumorImage3,
      brainTumorImage4,
      brainTumorImage5,
      brainTumorImage6,
      brainTumorImage7,
      brainTumorImage8,
    ],
  },
  {
    id: "5",
    icon: "💬",
    frontTitle: "AI Support Chat",
    frontText:
      "Multilingual AI-powered support system with sentiment analysis and human operator integration.",
    backTitle: "AI + Human Support Platform",
    description:
      "A customer support platform that seamlessly combines AI assistance with human operator capabilities. The system processes any JSON knowledge base to provide intelligent responses in multiple languages (Romanian, Russian, English), featuring content moderation and sentiment analysis to determine when human intervention is needed. Built with a React frontend and Python FastAPI backend with WebSockets for real-time communication.",
    projectImg: supportChatImage, // Replace with your actual image variable
    backText: "",
    skills: [
      "React",
      "Python",
      "FastAPI",
      "WebSockets",
      "AI Integration",
      "Sentiment Analysis",
      "Content Moderation",
      "Multilingual Support",
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "",
    githubLink: "",
    problemSolved:
      "Reducing support staff workload by automatically handling routine inquiries while intelligently escalating complex or emotionally charged cases to human operators.",
    workflowDetails:
      "1. User submits question → 2. System moderates content → 3. AI analyzes sentiment and searches knowledge base → 4. For complex or urgent issues, routes to operator → 5. Operators receive full conversation history → 6. Real-time chat session established → 7. Seamless handoff between AI and humans",
    technicalHighlights:
      "The platform implements sophisticated natural language processing to determine user intent and emotion. It features content moderation, sentiment analysis to detect urgency and emotion, and intelligent routing based on these factors. The WebSocket architecture enables real-time communication with automatic reconnection, message queuing and persistence across the platform. The knowledge base can be easily expanded in JSON format without code changes.",
    videoUrl:
      "https://player.cloudinary.com/embed/?public_id=2025-05-04_19-31-44_stak5h&cloud_name=dyrpdnkvs&profile=cld-default", // Add video URL if available
    isHorizontalVideo: true,
  },
  {
    id: "6",
    icon: "📄",
    frontTitle: "Document Scanner",
    frontText: "AI-powered document processing with automatic mask detection and binarization.",
    backTitle: "Intelligent Document Processing System",
    description: "A sophisticated document cropping and processing application that uses OpenCV for automatic mask detection and AI-powered binarization. Features include multi-file upload, real-time image editing with rotation and filtering, background processing with progress tracking, and export capabilities to PDF. Built with React, TypeScript, Canvas API, and integrates with external binarization services.",
    projectImg: doccumentScannerImage, // Replace with your actual image variable
    backText: "",
    skills: [
      "React",
      "TypeScript",
      "Canvas API",
      "OpenCV.js",
      "Image Processing",
      "Web Workers",
      "EventSource",
      "PDF Generation",
      "File Upload",
      "Real-time Editing",
      "Background Processing",
      "REST API Integration"
    ],
    projectUrl: "#",
    likes: 0,
    liveLink: "",
    githubLink: "",
    problemSolved: "Automating document digitization and improving image quality for better OCR results and document archiving.",
    workflowDetails: "1. Upload multiple document images → 2. Automatic mask detection using OpenCV → 3. Interactive crop area adjustment with real-time preview → 4. Apply image filters and rotation → 5. Background binarization processing with progress tracking → 6. Export processed documents to PDF",
    technicalHighlights: "The frontend implements a sophisticated image processing pipeline using Canvas API for real-time manipulation. It features dynamic handle radius calculation based on image dimensions, edge dragging for precise crop adjustments, and a loupe component for detailed editing. The system uses EventSource for real-time progress updates during background binarization and implements intelligent caching for filter combinations.",
    beWorkflow: "1. Docker Containerization (TensorFlow 2.15.0-gpu base) → 2. NVIDIA Runtime Configuration → 3. File Upload & Validation → 4. Image Loading with TensorFlow → 5. GPU Memory Configuration (TF_FORCE_GPU_ALLOW_GROWTH) → 6. Image Slicing (224x224 patches) → 7. 4-Directional Augmentation → 8. Neural Network Processing (TensorFlow SavedModel) → 9. Sigmoid Activation + Isotonic Regression Calibration → 10. Image Reconstruction from Slices → 11. Post-processing & Cleanup → 12. PNG Export & File Serving → 13. Volume Mounting for Persistent Storage",
    videoUrl: "https://player.cloudinary.com/embed/?public_id=document_scanner_n25ndv&cloud_name=dyrpdnkvs&profile=cld-default",
    isHorizontalVideo: true,
 
    modelTraining: "The binarization model uses a modified U-Net architecture with a frozen MobileNetV2 encoder (ImageNet pre-trained) for transfer learning. Training data consists of 224x224 pixel document images with corresponding binary masks from Google Drive. The model implements sophisticated data augmentation including random horizontal/vertical flips, hue adjustments, and innovative synthetic contrast blur generation using 10 random sinusoidal frequencies to simulate realistic document degradation. Training uses Adam optimizer with learning rate 1e-3, binary crossentropy loss, early stopping (patience=10), and learning rate reduction on plateau. The system includes nondeterministic binarization during training (random thresholds 0-255) for improved generalization. For inference, an 8-way test-time augmentation wrapper applies rotations and flips, averaging predictions for robust results. Post-training calibration uses isotonic regression to convert model logits into calibrated probabilities with reliability diagrams. The final model exports to multiple formats (SavedModel, H5, TensorFlow.js) and processes images via 224x224 patches with 4-directional augmentation for handling arbitrary input sizes. GPU optimization includes TF_FORCE_GPU_ALLOW_GROWTH for memory management and batch processing for efficiency."
  }
];

export {
  SENSITIVITY,
  FRICTION,
  VELOCITY_THRESHOLD,
  CARD_CONTENT,
  PROJECT_CARDS,
};
