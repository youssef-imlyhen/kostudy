export interface GeneratedApp {
  id: string;
  name: string;
  description: string;
  htmlContent: string;
  createdAt: Date;
  prompt: string;
  category?: string;
}

export interface StarterPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'game' | 'lesson' | 'simulation' | 'tool';
  icon: string;
}

export interface ContextSelection {
  includeCategories: boolean;
  includeMistakes: boolean;
  selectedCategories?: string[];
}

export interface GenerationRequest {
  prompt: string;
  context: ContextSelection;
  starterPromptId?: string;
}

export interface GenerationResponse {
  success: boolean;
  htmlContent?: string;
  error?: string;
  modelUsed?: string;
}

export interface ModelConfig {
  name: string;
  displayName: string;
  description: string;
  capabilities: string[];
  maxTokens?: number;
  temperature?: number;
}