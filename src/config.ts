// src/config.ts

// Defines the structure for a single content section
export interface ContentSection {
  type: 'heading' | 'paragraph' | 'list';
  content: string | string[]; // string for heading/paragraph, string[] for list items
}

// Defines the structure for a content-rich page
export interface ContentPage {
  title: string;
  sections: ContentSection[];
}

export interface AppConfig {
  appName:string;
  theme: string;
  primaryColor: string;
  aboutPage: ContentPage;
  contactPage: ContentPage;
  quizFeatures: {
    enableMultipleChoice: boolean;
    enableTrueFalse: boolean;
    enableFillInTheBlank: boolean;
    enableMultiSelect?: boolean;
    enableImageOptions?: boolean;
    enableQuestionImage?: boolean;
  };
  aiFeatures?: {
    enableAIGeneration?: boolean;
    geminiApiKey?: string;
  };
}

export const config: AppConfig = {
  appName: 'Kostudy',
  theme: 'light',
  primaryColor: '#58CC02',
  aboutPage: {
    title: 'About This App',
    sections: [
      { type: 'heading', content: 'Welcome!' },
      { type: 'paragraph', content: 'This is a customizable quiz application designed to be easily adapted for any topic. Built with modern web technologies, it offers a seamless and engaging user experience.' },
      { type: 'heading', content: 'Core Features' },
      { type: 'list', content: [
          'Easy content customization via a single config file.',
          'Dynamic theming to match your brand.',
          'Open-source and ready for contributions.'
        ]
      }
    ]
  },
  contactPage: {
    title: 'Contact Us',
    sections: [
      { type: 'heading', content: 'Get in Touch' },
      { type: 'paragraph', content: 'Have questions, suggestions, or want to contribute? The best way to reach out is by opening an issue on our GitHub repository.' }
    ]
  },
  quizFeatures: {
    enableMultipleChoice: true,
    enableTrueFalse: true,
    enableFillInTheBlank: true,
    enableMultiSelect: true,
    enableImageOptions: true,
    enableQuestionImage: true,
  },
  aiFeatures: {
    enableAIGeneration: true,
  },
};