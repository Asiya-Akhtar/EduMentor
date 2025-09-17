EduMentor (StudyMode Tutor)

EduMentor is an AI-powered tutoring application designed to provide personalized study support. Students can ask questions, get assignments, or take quizzes through an interactive chat-based interface. It combines modern frontend technologies with AI integration for a seamless learning experience.

 Features

🤖 AI-Powered Socratic Tutor – guides students step by step.

📚 Quiz Me & Assignments – interactive learning modes.

📂 File Upload Support – attach PDF, DOCX, TXT, or images for instant help.

🎨 Modern UI/UX – clean interface with light & dark mode.

⚡ Fast & Lightweight – built with React + Vite + TypeScript.

🔑 Secure API Integration with environment-based configuration.

 Tech Stack

Frontend: React (TypeScript), Vite

Styling: Tailwind CSS / custom components

State Management: React Hooks

Backend / API: Gemini AI API

Build & Config: Vite, tsconfig, dotenv

 Project Structure
studymodetutor/
├── App.tsx              # Main App component
├── components/          # UI components
├── services/            # API & utility services
├── hooks/               # Custom React hooks
├── types.ts             # TypeScript types
├── constants.ts         # Constants
├── index.tsx            # App entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
└── README.md            # Documentation

 Setup & Installation
Prerequisites

Node.js
 (v16 or later)

Gemini API Key (Get it from Google AI Studio
)

Run Locally

Clone the repository

git clone <your-repo-url>
cd studymodetutor


Install dependencies

npm install


Create .env.local and add your API key:

GEMINI_API_KEY=your_api_key_here


Start development server

npm run dev

 Deployment

Build for production:

npm run build


Preview production build:

npm run preview


Deploy easily on Vercel, Netlify, or any static host.

 Usage

Launch the app.

Start a chat by asking a study-related question.

Use Quiz Me or Give Assignment for structured learning.

Upload documents/images for direct AI assistance.

 Contributing

Contributions are welcome! Please fork this repo and submit a pull request with clear descriptions.

📜 License

This project is licensed under the MIT License.