import { GoogleGenAI } from '@google/genai';
import { GenerationRequest, GenerationResponse } from '../types/aiGenerator';
import { Question } from '../types/question';

export class AIAppGeneratorService {
  private genAI: GoogleGenAI;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async generateApp(request: GenerationRequest, userQuestions?: Question[], userMistakes?: Question[]): Promise<GenerationResponse> {
    try {
      const contextPrompt = this.buildContextPrompt(request.context, userQuestions, userMistakes);
      const systemPrompt = this.buildSystemPrompt();
      const helperLibrary = this.buildHelperLibrary();
      
      const fullPrompt = `${systemPrompt}

${helperLibrary}

${contextPrompt}

User Request: ${request.prompt}

Generate a complete, self-contained HTML application that fulfills this request. The application should be engaging, interactive, and well-designed.`;

      const result = await this.genAI.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: [{
          parts: [{ text: fullPrompt }]
        }]
      });

      const htmlContent = this.extractHTMLFromResponse(result.text || '');
      
      if (!htmlContent) {
        return {
          success: false,
          error: 'Failed to generate valid HTML content'
        };
      }

      return {
        success: true,
        htmlContent
      };
    } catch (error) {
      console.error('AI App Generation Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private buildSystemPrompt(): string {
    return `You are an expert web developer and creative technologist specializing in creating engaging, interactive web applications. Your task is to generate a complete, self-contained HTML file that includes HTML, CSS, and JavaScript all in one file.

CRITICAL REQUIREMENTS:
1. Generate ONLY a complete HTML file with embedded CSS and JavaScript
2. The application must be fully functional and self-contained
3. Use modern web technologies (HTML5, CSS3, ES6+ JavaScript)
4. Include responsive design principles
5. Add smooth animations and transitions where appropriate
6. Ensure accessibility with proper ARIA labels and semantic HTML
7. Include error handling and user feedback
8. Make the UI beautiful and engaging with modern design principles

DESIGN GUIDELINES:
- Use a modern, clean design aesthetic
- Implement smooth animations and micro-interactions
- Ensure mobile responsiveness
- Use appropriate color schemes and typography
- Include loading states and feedback for user actions
- Add sound effects or visual feedback where appropriate

TECHNICAL REQUIREMENTS:
- All code must be in a single HTML file
- Use inline CSS and JavaScript (no external dependencies except for the helper library)
- Implement proper error handling
- Include comments explaining key functionality
- Optimize for performance and smooth user experience`;
  }

  private buildHelperLibrary(): string {
    return `HELPER LIBRARY AVAILABLE:
You have access to a helper library called 'AIHelper' with the following functions:

// Generate text using Gemini Flash
AIHelper.generateText(prompt, options = {}) 
// Returns: Promise<string>
// Example: const story = await AIHelper.generateText("Write a short story about a robot");

// Generate an image using Imagen (returns a data URL)
AIHelper.generateImage(prompt, options = {})
// Returns: Promise<string> (data URL)
// Example: const imageUrl = await AIHelper.generateImage("A beautiful sunset over mountains");

// Text-to-speech
AIHelper.speak(text, options = {})
// Returns: Promise<void>
// Example: await AIHelper.speak("Hello, welcome to the game!");

// Speech recognition
AIHelper.listen(options = {})
// Returns: Promise<string>
// Example: const userSpeech = await AIHelper.listen();

// Save data to local storage with encryption
AIHelper.saveData(key, data)
// Example: AIHelper.saveData("gameScore", {score: 100, level: 5});

// Load data from local storage
AIHelper.loadData(key, defaultValue = null)
// Example: const gameData = AIHelper.loadData("gameScore", {score: 0, level: 1});

IMPLEMENTATION:
Include this script tag in your HTML head:
<script>
window.AIHelper = {
  async generateText(prompt, options = {}) {
    // Simulated for demo - in real implementation would call Gemini API
    return new Promise(resolve => {
      setTimeout(() => resolve("Generated text based on: " + prompt), 1000);
    });
  },
  
  async generateImage(prompt, options = {}) {
    // Simulated for demo - in real implementation would call Imagen API
    return new Promise(resolve => {
      setTimeout(() => resolve("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZTwvdGV4dD48L3N2Zz4="), 1000);
    });
  },
  
  async speak(text, options = {}) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      Object.assign(utterance, options);
      speechSynthesis.speak(utterance);
    }
  },
  
  async listen(options = {}) {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported'));
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onresult = (event) => {
        resolve(event.results[0][0].transcript);
      };
      
      recognition.onerror = reject;
      recognition.start();
    });
  },
  
  saveData(key, data) {
    localStorage.setItem('ai_app_' + key, JSON.stringify(data));
  },
  
  loadData(key, defaultValue = null) {
    const stored = localStorage.getItem('ai_app_' + key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
};
</script>

Use these functions to enhance your applications with AI capabilities!`;
  }

  private buildContextPrompt(context: any, userQuestions?: Question[], userMistakes?: Question[]): string {
    let contextPrompt = '';

    if (context.includeCategories && userQuestions && userQuestions.length > 0) {
      const categories = [...new Set(userQuestions.map(q => q.category))];
      contextPrompt += `\nUSER'S QUIZ CATEGORIES: ${categories.join(', ')}\n`;
      
      if (context.selectedCategories && context.selectedCategories.length > 0) {
        const selectedQuestions = userQuestions.filter(q => 
          context.selectedCategories.includes(q.category)
        );
        contextPrompt += `SELECTED CATEGORY QUESTIONS:\n${selectedQuestions.map(q => 
          `- ${q.question} (${q.category})`
        ).join('\n')}\n`;
      }
    }

    if (context.includeMistakes && userMistakes && userMistakes.length > 0) {
      contextPrompt += `\nUSER'S MISTAKE AREAS (focus on these topics):\n${userMistakes.map(q => 
        `- ${q.question} (${q.category}) - ${q.explanation || 'No explanation'}`
      ).join('\n')}\n`;
    }

    return contextPrompt;
  }

  private extractHTMLFromResponse(response: string): string | null {
    // Try to extract HTML from markdown code blocks
    const htmlMatch = response.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) {
      return htmlMatch[1].trim();
    }

    // Try to extract HTML from generic code blocks
    const codeMatch = response.match(/```\n([\s\S]*?)\n```/);
    if (codeMatch && codeMatch[1].includes('<!DOCTYPE html>')) {
      return codeMatch[1].trim();
    }

    // If no code blocks, check if the entire response is HTML
    if (response.includes('<!DOCTYPE html>') || response.includes('<html')) {
      return response.trim();
    }

    return null;
  }
}