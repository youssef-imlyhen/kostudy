import { GoogleGenAI } from '@google/genai';
import { GenerationRequest, GenerationResponse, ModelConfig } from '../types/aiGenerator';
import { Question } from '../types/question';

export interface AIModelConfig {
  name: string;
  displayName: string;
  description: string;
  capabilities: string[];
  maxTokens?: number;
  temperature?: number;
}

export const AVAILABLE_MODELS: Record<string, AIModelConfig> = {
  'gemini-2.5-pro': {
    name: 'gemini-2.5-pro',
    displayName: 'Gemini 2.5 Pro',
    description: 'Most capable model for complex reasoning and creative tasks',
    capabilities: ['text', 'code', 'reasoning', 'creative'],
    maxTokens: 8192,
    temperature: 0.7
  },
  'gemini-2.5-flash': {
    name: 'gemini-2.5-flash',
    displayName: 'Gemini 2.5 Flash',
    description: 'Fast and efficient model for quick responses',
    capabilities: ['text', 'code', 'speed'],
    maxTokens: 8192,
    temperature: 0.7
  },
  'gemini-2.0-flash-exp': {
    name: 'gemini-2.0-flash-exp',
    displayName: 'Gemini 2.0 Flash (Experimental)',
    description: 'Latest experimental model with enhanced capabilities',
    capabilities: ['text', 'code', 'multimodal', 'experimental'],
    maxTokens: 1000000,
    temperature: 0.7
  },
  'gemini-2.0-flash-preview-image-generation': {
    name: 'gemini-2.0-flash-preview-image-generation',
    displayName: 'Gemini 2.0 Flash Image Generation',
    description: 'Specialized model for high-quality image generation',
    capabilities: ['image-generation', 'multimodal', 'creative'],
    maxTokens: 8192,
    temperature: 0.7
  }
};

// Specific model constants for different capabilities
export const IMAGE_GENERATION_MODEL = 'gemini-2.0-flash-preview-image-generation';
export const TEXT_GENERATION_MODELS = {
  PRO: 'gemini-2.5-pro',
  FLASH: 'gemini-2.5-flash',
  EXPERIMENTAL: 'gemini-2.0-flash-exp'
};

export class EnhancedAIService {
  private genAI: GoogleGenAI;
  private selectedModel: string;

  constructor(apiKey: string, model: string = 'gemini-2.5-pro') {
    this.genAI = new GoogleGenAI({ apiKey });
    this.selectedModel = model;
  }

  setModel(model: string) {
    if (AVAILABLE_MODELS[model]) {
      this.selectedModel = model;
    }
  }

  async generateApp(request: GenerationRequest, userQuestions?: Question[], userMistakes?: Question[]): Promise<GenerationResponse> {
    try {
      const contextPrompt = this.buildEnhancedContextPrompt(request.context, userQuestions, userMistakes);
      const systemPrompt = this.buildEnhancedSystemPrompt();
      const helperLibrary = this.buildAdvancedHelperLibrary();
      const domainExpertise = this.buildDomainExpertise(request.context, userQuestions);
      
      const fullPrompt = `${systemPrompt}

${domainExpertise}

${helperLibrary}

${contextPrompt}

User Request: ${request.prompt}

GENERATION INSTRUCTIONS:
1. Analyze the user's request and context deeply
2. Create an engaging, interactive application that addresses their specific needs
3. If categories are selected, focus heavily on those topics and create content that helps users learn
4. If mistakes are included, design the app to help users practice and improve in those areas
5. Use modern web technologies and best practices
6. Make the app visually appealing and user-friendly
7. Include educational elements if the context suggests learning goals

Generate a complete, self-contained HTML application that fulfills this request.`;

      const modelConfig = AVAILABLE_MODELS[this.selectedModel];
      const result = await this.genAI.models.generateContent({
        model: this.selectedModel,
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
        htmlContent,
        modelUsed: this.selectedModel
      };
    } catch (error) {
      console.error('Enhanced AI App Generation Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private buildEnhancedSystemPrompt(): string {
    return `You are an expert full-stack developer, educational technologist, and UX designer with deep expertise in creating engaging, interactive web applications. You specialize in educational technology, gamification, and user-centered design.

CORE MISSION:
Create exceptional, self-contained HTML applications that are not just functional, but truly engaging and educational. Every application should feel polished, professional, and purposeful.

CRITICAL REQUIREMENTS:
1. Generate ONLY a complete HTML file with embedded CSS and JavaScript
2. The application must be fully functional and self-contained
3. Use cutting-edge web technologies (HTML5, CSS3, ES2023+ JavaScript)
4. Implement responsive design with mobile-first approach
5. Include smooth animations, transitions, and micro-interactions
6. Ensure full accessibility (WCAG 2.1 AA compliance)
7. Add comprehensive error handling and user feedback
8. Create beautiful, modern UI with attention to visual hierarchy
9. Implement progressive enhancement principles
10. Include performance optimizations

DESIGN EXCELLENCE:
- Use modern design systems (consider Material Design, Fluent, or custom)
- Implement smooth, purposeful animations (CSS animations, Web Animations API)
- Ensure excellent typography and color theory application
- Create intuitive user flows and information architecture
- Add delightful micro-interactions and feedback
- Use appropriate iconography and visual elements
- Implement dark/light mode support where relevant
- Consider accessibility in color contrast and interaction design

EDUCATIONAL FOCUS:
- If the context includes learning categories, create educational content
- Use spaced repetition principles for learning apps
- Implement progress tracking and achievement systems
- Add explanations, hints, and learning scaffolds
- Create adaptive difficulty based on user performance
- Include knowledge checks and self-assessment tools

TECHNICAL EXCELLENCE:
- Write clean, maintainable, well-commented code
- Use modern JavaScript features (async/await, modules, etc.)
- Implement proper error boundaries and fallbacks
- Add loading states and skeleton screens
- Use CSS Grid and Flexbox for layouts
- Implement CSS custom properties for theming
- Add proper semantic HTML structure
- Include meta tags for SEO and social sharing`;
  }

  private buildAdvancedHelperLibrary(): string {
    return `ADVANCED AI HELPER LIBRARY:
You have access to an enhanced 'AIHelper' library with powerful capabilities:

// GEMINI FLASH 2.0 TEXT GENERATION
AIHelper.generateText(prompt, options = {})
// Options: { model: 'flash-2.0' | 'pro', temperature: 0.1-1.0, maxTokens: number }
// Returns: Promise<string>
// Example: const explanation = await AIHelper.generateText("Explain quantum physics simply", { model: 'flash-2.0', temperature: 0.3 });

// GEMINI 2.0 FLASH IMAGE GENERATION
AIHelper.generateImage(prompt, options = {})
// Uses: gemini-2.0-flash-preview-image-generation model
// Options: { style: 'photorealistic' | 'artistic' | 'cartoon', size: '256x256' | '512x512' | '1024x1024' }
// Returns: Promise<string> (data URL)
// Example: const imageUrl = await AIHelper.generateImage("A futuristic classroom with holographic displays", { style: 'photorealistic', size: '512x512' });

// ADVANCED TEXT-TO-SPEECH
AIHelper.speak(text, options = {})
// Options: { voice: string, rate: 0.1-10, pitch: 0-2, volume: 0-1, lang: string }
// Returns: Promise<void>
// Example: await AIHelper.speak("Welcome to your personalized learning experience!", { rate: 0.9, pitch: 1.1 });

// ENHANCED SPEECH RECOGNITION
AIHelper.listen(options = {})
// Options: { lang: string, continuous: boolean, interimResults: boolean }
// Returns: Promise<string>
// Example: const userResponse = await AIHelper.listen({ lang: 'en-US', continuous: false });

// INTELLIGENT DATA PERSISTENCE
AIHelper.saveData(key, data, options = {})
// Options: { encrypt: boolean, expire: number (ms), sync: boolean }
// Example: AIHelper.saveData("userProgress", progressData, { encrypt: true, expire: 86400000 });

// SMART DATA RETRIEVAL
AIHelper.loadData(key, defaultValue = null, options = {})
// Options: { decrypt: boolean, fallback: any }
// Example: const progress = AIHelper.loadData("userProgress", { level: 1, score: 0 }, { decrypt: true });

// REAL-TIME AI ASSISTANCE
AIHelper.getContextualHelp(userAction, context = {})
// Returns: Promise<string>
// Example: const hint = await AIHelper.getContextualHelp("struggling_with_question", { topic: "algebra", attempts: 3 });

// ADAPTIVE DIFFICULTY ADJUSTMENT
AIHelper.adjustDifficulty(currentLevel, performance, options = {})
// Returns: { newLevel: number, suggestions: string[] }
// Example: const adjustment = AIHelper.adjustDifficulty(3, { correct: 7, total: 10 });

IMPLEMENTATION SCRIPT:
<script>
window.AIHelper = {
  // Enhanced text generation with model selection
  async generateText(prompt, options = {}) {
    const { model = 'flash-2.0', temperature = 0.7, maxTokens = 1000 } = options;
    // In production, this would call the actual Gemini API
    return new Promise(resolve => {
      setTimeout(() => {
        const responses = {
          'flash-2.0': \`Enhanced response using Gemini Flash 2.0: \${prompt}\`,
          'pro': \`Detailed response using Gemini Pro: \${prompt}\`
        };
        resolve(responses[model] || responses['flash-2.0']);
      }, 800);
    });
  },
  
  // Advanced image generation with Gemini 2.0 Flash Image Generation
  async generateImage(prompt, options = {}) {
    const { style = 'photorealistic', size = '512x512' } = options;
    
    // In production, this would use the actual Gemini 2.0 Flash Image Generation model
    const imageModel = 'gemini-2.0-flash-preview-image-generation';
    
    return new Promise(resolve => {
      // Generate a more sophisticated placeholder that simulates the actual model
      const canvas = document.createElement('canvas');
      const [width, height] = size.split('x').map(Number);
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Create style-specific gradients
      let gradient;
      switch(style) {
        case 'photorealistic':
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, '#2c3e50');
          gradient.addColorStop(1, '#3498db');
          break;
        case 'artistic':
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, '#8e44ad');
          gradient.addColorStop(1, '#e74c3c');
          break;
        case 'cartoon':
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, '#f39c12');
          gradient.addColorStop(1, '#27ae60');
          break;
        default:
          gradient = ctx.createLinearGradient(0, 0, width, height);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add model-specific text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Gemini 2.0 Flash', width/2, height/2 - 20);
      ctx.fillText('Image Generation', width/2, height/2);
      ctx.font = '12px Arial';
      ctx.fillText(\`Style: \${style}\`, width/2, height/2 + 20);
      ctx.fillText(\`Size: \${size}\`, width/2, height/2 + 35);
      
      setTimeout(() => resolve(canvas.toDataURL()), 1200);
    });
  },
  
  // Enhanced speech synthesis
  async speak(text, options = {}) {
    const { voice, rate = 1, pitch = 1, volume = 1, lang = 'en-US' } = options;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      utterance.lang = lang;
      
      if (voice) {
        const voices = speechSynthesis.getVoices();
        const selectedVoice = voices.find(v => v.name.includes(voice));
        if (selectedVoice) utterance.voice = selectedVoice;
      }
      
      return new Promise(resolve => {
        utterance.onend = resolve;
        speechSynthesis.speak(utterance);
      });
    }
  },
  
  // Advanced speech recognition
  async listen(options = {}) {
    const { lang = 'en-US', continuous = false, interimResults = false } = options;
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported'));
        return;
      }
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = lang;
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      
      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        if (result.isFinal) {
          resolve(result[0].transcript);
        }
      };
      
      recognition.onerror = reject;
      recognition.start();
    });
  },
  
  // Intelligent data persistence
  saveData(key, data, options = {}) {
    const { encrypt = false, expire, sync = false } = options;
    const storageData = {
      data: encrypt ? btoa(JSON.stringify(data)) : data,
      timestamp: Date.now(),
      expire: expire ? Date.now() + expire : null,
      encrypted: encrypt
    };
    
    localStorage.setItem('ai_app_' + key, JSON.stringify(storageData));
    
    if (sync && 'serviceWorker' in navigator) {
      // In production, sync with cloud storage
      console.log('Syncing data to cloud...');
    }
  },
  
  // Smart data retrieval
  loadData(key, defaultValue = null, options = {}) {
    const { decrypt = false, fallback } = options;
    const stored = localStorage.getItem('ai_app_' + key);
    
    if (!stored) return fallback || defaultValue;
    
    try {
      const storageData = JSON.parse(stored);
      
      // Check expiration
      if (storageData.expire && Date.now() > storageData.expire) {
        localStorage.removeItem('ai_app_' + key);
        return fallback || defaultValue;
      }
      
      // Decrypt if needed
      if (storageData.encrypted && decrypt) {
        return JSON.parse(atob(storageData.data));
      }
      
      return storageData.data;
    } catch (e) {
      return fallback || defaultValue;
    }
  },
  
  // Contextual AI assistance
  async getContextualHelp(userAction, context = {}) {
    const helpPrompts = {
      'struggling_with_question': \`The user is having trouble with a \${context.topic || 'general'} question after \${context.attempts || 1} attempts. Provide a helpful hint without giving away the answer.\`,
      'completed_level': \`The user just completed a level in \${context.topic || 'the subject'}. Provide encouraging feedback and suggest next steps.\`,
      'need_explanation': \`The user wants to understand \${context.concept || 'this concept'} better. Provide a clear, simple explanation.\`
    };
    
    const prompt = helpPrompts[userAction] || \`Provide help for: \${userAction}\`;
    return this.generateText(prompt, { model: 'flash-2.0', temperature: 0.5 });
  },
  
  // Adaptive difficulty system
  adjustDifficulty(currentLevel, performance, options = {}) {
    const { correct = 0, total = 1 } = performance;
    const accuracy = correct / total;
    
    let newLevel = currentLevel;
    let suggestions = [];
    
    if (accuracy >= 0.8 && currentLevel < 10) {
      newLevel = Math.min(currentLevel + 1, 10);
      suggestions.push("Great job! Moving to a more challenging level.");
    } else if (accuracy < 0.5 && currentLevel > 1) {
      newLevel = Math.max(currentLevel - 1, 1);
      suggestions.push("Let's practice a bit more at this level.");
    } else {
      suggestions.push("You're doing well! Keep practicing.");
    }
    
    return { newLevel, suggestions };
  }
};
</script>

Use these advanced capabilities to create truly intelligent and adaptive applications!`;
  }

  private buildDomainExpertise(context: any, userQuestions?: Question[]): string {
    if (!context.includeCategories || !userQuestions?.length) {
      return '';
    }

    const categories = [...new Set(userQuestions.map(q => q.category))];
    const selectedCategories = context.selectedCategories || categories;
    
    let expertise = '\nDOMAIN EXPERTISE CONTEXT:\n';
    expertise += `You are now also an expert in: ${selectedCategories.join(', ')}\n`;
    
    // Add specific expertise based on categories
    selectedCategories.forEach((category: string) => {
      const categoryQuestions = userQuestions.filter(q => q.category === category);
      const difficulties = [...new Set(categoryQuestions.map(q => q.difficulty))];
      const questionTypes = [...new Set(categoryQuestions.map(q => q.type))];
      
      expertise += `\n${category.toUpperCase()} EXPERTISE:`;
      expertise += `\n- Question types available: ${questionTypes.join(', ')}`;
      expertise += `\n- Difficulty levels: ${difficulties.join(', ')}`;
      expertise += `\n- Total questions: ${categoryQuestions.length}`;
      
      // Add sample questions for context
      const sampleQuestions = categoryQuestions.slice(0, 3);
      if (sampleQuestions.length > 0) {
        expertise += `\n- Sample questions:`;
        sampleQuestions.forEach(q => {
          expertise += `\n  * ${q.question} (${q.difficulty})`;
        });
      }
    });
    
    expertise += '\n\nUse this domain knowledge to create highly relevant, educational content that addresses the specific topics and difficulty levels the user is working with.\n';
    
    return expertise;
  }

  private buildEnhancedContextPrompt(context: any, userQuestions?: Question[], userMistakes?: Question[]): string {
    let contextPrompt = '\n=== USER CONTEXT ANALYSIS ===\n';

    if (context.includeCategories && userQuestions && userQuestions.length > 0) {
      const allCategories = [...new Set(userQuestions.map(q => q.category))];
      const selectedCategories = context.selectedCategories || allCategories;
      
      contextPrompt += `\nLEARNING FOCUS AREAS: ${selectedCategories.join(', ')}\n`;
      contextPrompt += `TOTAL AVAILABLE CATEGORIES: ${allCategories.join(', ')}\n`;
      
      selectedCategories.forEach((category: string) => {
        const categoryQuestions = userQuestions.filter(q => q.category === category);
        const difficultyBreakdown = categoryQuestions.reduce((acc, q) => {
          acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        contextPrompt += `\n${category.toUpperCase()} ANALYSIS:`;
        contextPrompt += `\n- Total questions: ${categoryQuestions.length}`;
        contextPrompt += `\n- Difficulty breakdown: ${Object.entries(difficultyBreakdown).map(([diff, count]) => `${diff}: ${count}`).join(', ')}`;
        
        // Include a few representative questions
        const representativeQuestions = categoryQuestions
          .sort((a, b) => ['easy', 'medium', 'hard'].indexOf(a.difficulty) - ['easy', 'medium', 'hard'].indexOf(b.difficulty))
          .slice(0, 5);
        
        contextPrompt += `\n- Key topics covered:`;
        representativeQuestions.forEach(q => {
          contextPrompt += `\n  * ${q.question} [${q.difficulty}] - ${q.explanation || 'No explanation provided'}`;
        });
      });
      
      contextPrompt += `\n\nINSTRUCTION: Create an application that helps users learn and practice these specific topics. Focus on the selected categories and create content that reinforces learning in these areas.`;
    }

    if (context.includeMistakes && userMistakes && userMistakes.length > 0) {
      const mistakeCategories = [...new Set(userMistakes.map(q => q.category))];
      const mistakesByCategory = mistakeCategories.reduce((acc, category) => {
        acc[category] = userMistakes.filter(q => q.category === category);
        return acc;
      }, {} as Record<string, Question[]>);
      
      contextPrompt += `\n\nLEARNING GAPS IDENTIFIED:\n`;
      contextPrompt += `Areas needing improvement: ${mistakeCategories.join(', ')}\n`;
      
      Object.entries(mistakesByCategory).forEach(([category, mistakes]) => {
        contextPrompt += `\n${category.toUpperCase()} - MISTAKES TO ADDRESS:`;
        mistakes.forEach(mistake => {
          contextPrompt += `\n- MISTAKE: ${mistake.question}`;
          contextPrompt += `\n  EXPLANATION: ${mistake.explanation || 'No explanation provided'}`;
          contextPrompt += `\n  DIFFICULTY: ${mistake.difficulty}`;
        });
      });
      
      contextPrompt += `\n\nINSTRUCTION: Pay special attention to these mistake areas. Create targeted practice exercises, explanations, and reinforcement activities to help the user overcome these specific learning gaps.`;
    }

    if (!context.includeCategories && !context.includeMistakes) {
      contextPrompt += `\nNo specific learning context provided. Create a general-purpose application based on the user's request.`;
    }

    contextPrompt += '\n=== END CONTEXT ANALYSIS ===\n';
    
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

  // Utility method to get available models
  static getAvailableModels(): AIModelConfig[] {
    return Object.values(AVAILABLE_MODELS);
  }

  // Method to validate API key with different models
  async validateApiKey(): Promise<{ valid: boolean; supportedModels: string[] }> {
    const supportedModels: string[] = [];
    
    for (const modelName of Object.keys(AVAILABLE_MODELS)) {
      try {
        await this.genAI.models.generateContent({
          model: modelName,
          contents: [{ parts: [{ text: 'Hello' }] }]
        });
        supportedModels.push(modelName);
      } catch (error) {
        console.warn(`Model ${modelName} not available:`, error);
      }
    }
    
    return {
      valid: supportedModels.length > 0,
      supportedModels
    };
  }
}