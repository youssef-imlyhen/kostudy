# Kostudy

<p align="center">
  <img src="public/kostudy.png" alt="Kostudy logo" width="160" />
</p>

Most of today’s learning tools fall short. They either hook you with cheap gamification to sell more ads, or they slap a chatbot onto a decade-old quiz and call it an "AI education app." You deserve better.

That’s why I built **KoStudy**. It’s an AI-first, feature-rich, open-source learning application built with React, TypeScript, and Tailwind CSS. It leverages the Google Gemini API and other advanced AI capabilities to deliver an intelligent, context-aware, and engaging learning experience.

This is my attempt to reimagine what a learning app should be in the age of AI. It’s a glimpse into the future of AI-powered education—and I hope you find it useful.


## Live Demo

- Watch on YouTube: https://youtu.be/VsXnGYEopW0?si=qPlHpDq75T32G-RJ
- Try it at https://kostudy.netlify.app/

https://github.com/user-attachments/assets/6f3066c1-657b-4e5f-b002-2f2f06004002


## Features

### AI-Powered Features
- **AI Question Generation**:  
  Dynamically generate challenging questions on any topic using the Google Gemini API. Enhance the question creation process by incorporating various types of context such as YouTube videos, other video sources, PDFs, or audio files. This allows the system to pull content and generate contextually relevant questions, thereby enriching the learning experience.
- **AI Chat Assistant**:  
  Engage in an interactive chat with the AI that not only explains quiz concepts but also leverages rich media context (e.g., videos, PDFs, or audio) to provide detailed explanations and answers. The assistant can tailor its responses based on user-provided contextual content.
- **Live AI Call**:  
  Experience real-time voice conversations with the AI. This feature provides dynamic Q&A sessions, offering instant feedback and clarifying doubts during your study sessions.
- **AI App Studio**:  
  Generate complete game apps from scratch based on user prompts, lessons learned from mistakes, or curated educational inputs. This innovative feature allows users to create custom learning or game experiences, making education interactive and engaging.
- **Interactive SagaLearn**:  
  Transform learning into an adventure! The SagaLearn mode generates interactive, choose-your-own-adventure style games. Players freely explore narratives where the storyline evolves dynamically based on choices and performance, making quiz sessions both fun and immersive.

### Core Quiz Features
- **Multiple Question Types**:  
  - **Multiple Choice**: Supports both single-select and multi-select questions.
  - **True / False**: Standard true/false questions.
  - **Fill-in-the-Blank**: Designed to test recall by letting users input their answers.
  - **Image Options & Question Images**: Enhance questions with visual aids.
- **Custom Questions & Categories**:  
  - Easily add, edit, and delete questions through an intuitive interface.
  - Import questions from JSON or CSV files.
  - Create and customize categories with assigned emojis.
- **Dynamic Theming**:  
  - Switch between light and dark themes.
  - Customize primary colors and other theme elements via configuration.
- **Localization & International Support**:  
  - Supports a wide range of languages including English, French, Spanish, Arabic, German, Hindi, Portuguese, Chinese, Russian, Japanese, Korean, Italian, Dutch, Polish, Turkish, Czech, and more.
- **Data Import/Export**:  
  - Backup and restore your questions, progress, and settings seamlessly.
- **Responsive Design**:  
  - Optimized for devices ranging from mobile phones to desktops.
- **PWA Support**:  
  - Installable as a Progressive Web App for offline use and a native-like experience.

### Interactive Learning Modes
- **SagaLearn Adventure Mode**:  
  Generates an interactive, narrative-based quiz adventure that feels like a choose-your-own-adventure game. Explore a dynamic story where your choices influence the storyline, making learning a playful and immersive journey.
- **Performance & Achievement System**:  
  Earn points, unlock badges, and receive achievement notifications as you progress. Review mistakes and achievements for continuous improvement.

### Developer & Customization Features
- **Easy Configuration & Theming**:  
  All aspects of the app can be customized via a central configuration file (<code>src/config.ts</code>), including themes, features, and AI functionalities.
- **Robust Routing & Modular Components**:  
  Built with React Router for efficient navigation and designed in a modular format to facilitate easy expansion and integration of new features.
- **State Management & Context API**:  
  Utilizes React contexts to manage user data, quiz progress, and theme settings smoothly.
- **Progressive Enhancement**:  
  The architecture is designed to support regular updates and new feature integrations.
- **Open Source & Community-Driven**:  
  Contributions are welcomed. Issues and pull requests help drive continuous improvement of the app.

## Use Cases
- Personal learning companion: feed your own materials (notes, PDFs, videos, links) and learn interactively with quizzes, explanations, chat, and voice.
- Family and kids: set up profiles for family members or children with age-appropriate content and track progress.
- Classroom and cohorts: teachers can prepare question banks, categories, and share via import/export for students to practice.
- Teams and onboarding: curate domain knowledge, SOPs, and product docs to train new hires quickly.
- Commercial deployments: use it as the core of a SaaS, internal tool, or branded training portal. Licensed under MIT for flexible use.

## Supported Languages

The application provides extensive localization support for a multitude of languages including, but not limited to:
- English
- French
- Spanish
- Arabic
- German
- Hindi
- Portuguese
- Chinese
- Russian
- Japanese
- Korean
- Italian
- Dutch
- Polish
- Turkish
- Czech
- And many more



<!-- Example content note: default seed uses YouTube questions -->
> Note: This repository ships with an example seed question bank focused on YouTube growth strategy, sourced from concepts in [docs/youtube-knowledge.md](docs/youtube-knowledge.md:1). You can replace or extend this seed with your own topics by editing [src/data/youtubeQuestions.ts](src/data/youtubeQuestions.ts:1). The app composes its flat question list from this module via [src/data/questions.ts](src/data/questions.ts:1), using the schema defined in [src/types/question.ts](src/types/question.ts:1).

## Backstory

Somehow I find myself always back to learning apps—I guess every dev does, lol. Back in 2021, after learning just the basics of programming, I was eager to use this new skill to help myself and my close ones. It began with learning English. I created [WordTrainer](https://github.com/youssef-imlyhen/WordTrainer) — a simple web app to practice the most‑used words and phrases in a language. Later, I dug deeper into the science of learning and language acquisition. Based on those principles, I built [LanTrainer](https://github.com/youssef-imlyhen/LanTrainer) — a React app that uses movies to help learn languages through multi‑subtitle viewing, saving quotes, and quizzing.

After that, I joined an ed‑tech startup working with AI and robotics to teach languages. Three years later, I found myself returning to this field with Kostudy. About a year ago, a family member asked me to help build a religious learning app, and myself though of creating something to help younger siblings and relatives learn languages, and other subjects, and around the same time, I was working on [autonolab.com](https://autonolab.com) — an AI YouTube growth platform, and though of adding it to help creators learn about Youtube Growth. It felt natural to bring these threads together: Kostudy as an open‑source learning platform for the age of AI, flexible enough for family learning and extensible.  The goal is a thoughtful, modern tool that anyone can use or build on.



## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/youssef-imlyhen/kostudy.git
   cd kostudy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
The application will be available at <code>http://localhost:5173</code>.

## Customization

### Adding Questions

You can add questions in three ways:
1. **Manually**:  
   Navigate to the "Question Bank" and click "Add New".
2. **Importing**:  
   In the "Question Bank", click "Options" and then "Import" to upload a JSON or CSV file.
3. **Directly in the code**:
   Add or replace questions in <code>src/data/youtubeQuestions.ts</code>.
   The app aggregates from this module inside <code>src/data/questions.ts</code>, which also holds category-to-emoji mappings.

#### Question Schema

Questions follow this structure (as defined in <code>src/types/question.ts</code>):
```typescript
export type Question = {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-in-the-blank';
  category: string;
  question: string;
  imageUrl?: string; // Optional
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options?: string[]; // For multiple-choice
  correctAnswer: string | string[] | boolean;
};
```

**Example `multiple-choice` question:**
```json
{
  "id": "mc1",
  "type": "multiple-choice",
  "category": "Science",
  "question": "What is the chemical symbol for water?",
  "explanation": "H2O represents two hydrogen atoms and one oxygen atom.",
  "difficulty": "easy",
  "options": ["O2", "H2O", "CO2", "NaCl"],
  "correctAnswer": "H2O"
}
```

**Example `true-false` question:**
```json
{
  "id": "tf1",
  "type": "true-false",
  "category": "General Knowledge",
  "question": "The Great Wall of China is visible from space.",
  "correctAnswer": false,
  "explanation": "This is a common misconception. The Great Wall is not visible from space with the naked eye.",
  "difficulty": "easy"
}
```

### Initial Question Seeding (YouTube example)

This project includes a production-ready seed bank focused on YouTube growth. To add your initial questions (replace the YouTube seed with your own domain):

1) Decide your categories
- Keep or change the 10-category system in <code>[src/data/questions.ts](src/data/questions.ts:9)</code> (categoryEmojis object).
- Categories are free-form strings; ensure consistent spelling.

2) Author your questions
- Edit <code>[src/data/youtubeQuestions.ts](src/data/youtubeQuestions.ts:1)</code> and replace the exported array with your own questions that follow the schema from <code>[src/types/question.ts](src/types/question.ts:1)</code>.
- Supported types: 'multiple-choice' (options + correctAnswer as string or string[]), 'true-false' (correctAnswer boolean), 'fill-in-the-blank' (correctAnswer string).
- Provide rich explanations for learning value and set difficulty: 'easy' | 'medium' | 'hard'.

3) Map category emojis (optional but recommended)
- Update or extend <code>[categoryEmojis](src/data/questions.ts:9)</code> to add emojis for your categories.
- A smart fallback in <code>[getCategoryEmoji](src/data/questions.ts:96)</code> will attempt to infer an emoji from words if no direct mapping exists.

4) Verify retrieval helpers
- The app uses helpers in <code>[src/data/questions.ts](src/data/questions.ts:133)</code> to list categories, filter by category, and randomize questions. No changes typically required.

5) Import alternatives
- Instead of coding by hand, you can import JSON/CSV from the Question Bank UI. See “Importing” above. Files should serialize using the same fields shown in the Question Schema section.

Note: The default example seed uses YouTube strategy questions derived from <code>[docs/youtube-knowledge.md](docs/youtube-knowledge.md:1)</code>. Replace this with your own subject matter as needed.

### Theme and Customization

Customize the application’s appearance and behavior by editing the <code>src/config.ts</code> file:
- **appName**: The name of your application.
- **theme**: Default theme (either 'light' or 'dark').
- **primaryColor**: The primary color used throughout the app.
- **quizFeatures**: Enable or disable various question types.
- **aiFeatures**: Toggle AI-powered features and set your Gemini API key if applicable.

## Deploy with One Click (Netlify, Vercel, GitHub Pages)

This app is a static site (built with Vite) and can be deployed for free on multiple providers. Build command: `npm run build`. Publish directory: `dist`.

- Netlify (One‑click)
  - Button:
    [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/youssef-imlyhen/kostudy)
  - After clicking:
    - Site name: any
    - Build command: `npm run build`
    - Publish directory: `dist`
    - Environment: none required by default (AI features are optional; see [src/config.ts](src/config.ts:35))

- Vercel (One‑click)
  - Button:
    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository=https://github.com/youssef-imlyhen/kostudy)
  - After clicking:
    - Framework preset: Vite (auto-detected)
    - Build command: `npm run build`
    - Output directory: `dist`

- GitHub Pages (free)
  - Steps:
    - Push your repo to GitHub.
    - Build locally: `npm run build` (outputs to `dist`)
    - Install GitHub Pages CLI or use an Action. Quick manual step:
      `npx gh-pages -d dist`
    - Or set up the “Static file” workflow in Actions to publish `dist` on push.
  - Note: For a fully automated approach, add a GitHub Action that runs `npm ci && npm run build` and uploads `dist` to Pages.

- Static hosts (Surge, Cloudflare Pages, etc.)
  - Surge: `npm run build` then `npx surge ./dist your-subdomain.surge.sh`
  - Cloudflare Pages: connect your repo; set build command `npm run build` and output directory `dist`.

Build and preview locally
- Install: `npm install`
- Dev: `npm run dev`
## Disclaimer
Kostudy is under active development. Expect rapid iteration as we improve code quality and project structure. We plan to:
- Refactor and modularize core components for clarity and maintainability
- Tighten TypeScript types, lint rules, and adopt stricter CI checks
- Add comprehensive tests (unit, integration, and end-to-end) to ensure reliability
- Production build: `npm run build`
- Preview production build locally: `npm run preview`

Notes
- If you enable AI features, configure credentials as needed via your own mechanism (see [src/config.ts](src/config.ts:68)). This template does not ship sensitive keys.
- If a CI system running Tailwind cannot import TS from [tailwind.config.js](tailwind.config.js:1), mirror `primaryColor` in a small JS module or inline the hex value.

## Roadmap
- Add more AI providers, including support for local AI models (e.g., llama.cpp, Ollama, LM Studio).
- Improve the design: refine visual hierarchy, spacing, and component styling; ship polished light/dark themes.
- Improve the prompts: strengthen system and user prompts for higher-quality generations and explanations; add an evaluation harness for prompt iterations.
- Spaced repetition and learning science: integrate spaced repetition, retrieval practice, interleaving, and adaptive difficulty for long-term retention.
- Prepare more starter materials and templates for common use cases (languages, exam prep, coding interview prep, K-12 subjects).
- Enhance onboarding and templates: provide more starter datasets, categories, and guided setup flows.
- Expand import/export: additional formats, better validation, and richer error feedback.
- Accessibility and performance: a11y best practices, lazy-loading, and bundle size budgets.
- CI/CD: preview deployments on PRs and increased automated test coverage.
- Code quality and testing: ongoing refactors, stricter TypeScript types/lint rules, and comprehensive unit/integration/E2E tests.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [daisyUI](https://daisyui.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Heroicons](https://heroicons.com/)
- [Google Gemini API](https://ai.dev/apikey)
- [Vite PWA](https://vite-pwa-org.netlify.app/)

## Need help setting it up?
If you’re not technical and want to use KoStudy but need help getting it running, don’t hesitate to reach out. I’ll do my best to help you set it up for free.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to your branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Screenshots

![frame_048_139 32s](https://github.com/user-attachments/assets/40722e46-2b7e-41ee-9dbc-49361e45a5c8)
![frame_046_132 42s](https://github.com/user-attachments/assets/20ac1a5d-a560-400b-b4fb-29ff0215744d)
![frame_041_118 64s](https://github.com/user-attachments/assets/98141dc2-a1d0-4ab4-aa5d-42298381cef6)
![frame_040_115 81s](https://github.com/user-attachments/assets/c82b7e39-b6e5-4cd5-a990-21b57b8e3241)
![frame_023_112 59s](https://github.com/user-attachments/assets/cf0110cc-8c58-4bb8-9077-38f750a7822d)
![frame_023_67 56s](https://github.com/user-attachments/assets/aaea8589-bdec-44d9-9c47-4e5cc8d0e8ec)
![frame_022_104 55s](https://github.com/user-attachments/assets/1ee9957e-5295-4bb0-912c-6287ec5147f4)
![frame_015_43 43s](https://github.com/user-attachments/assets/e5dd4171-6b74-442f-a25a-d1837d789a3c)
![frame_012_112 59s](https://github.com/user-attachments/assets/dc900847-03d8-4e80-bd15-6c25807e8de2)
![frame_009_28 95s](https://github.com/user-attachments/assets/a2e919f1-c3c8-4c99-9719-188487fa56da)
![frame_008_80 42s](https://github.com/user-attachments/assets/bee9a784-07e1-480d-a94c-fb50c5d9acb1)
![frame_006_64 34s](https://github.com/user-attachments/assets/7c4a4d31-d6e6-4290-bfec-82ff535540a0)
![frame_005_15 23s](https://github.com/user-attachments/assets/be63b0ed-1bc5-4c35-a3ab-768044c84823)

