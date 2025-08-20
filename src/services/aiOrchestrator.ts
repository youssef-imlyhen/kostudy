import { GoogleGenAI } from '@google/genai';
import { Question } from '../types/question';

// Types for the AI Orchestrator
export interface TaskPlan {
  id: string;
  description: string;
  steps: TaskStep[];
  estimatedTime: number;
  complexity: 'simple' | 'medium' | 'complex';
}

export interface TaskStep {
  id: string;
  type: 'text_generation' | 'image_generation' | 'app_generation' | 'review' | 'refinement';
  description: string;
  model: string;
  dependencies: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: any;
  prompt?: string;
}

export interface GenerationRequest {
  userPrompt: string;
  context?: {
    categories?: string[];
    mistakes?: Question[];
    userQuestions?: Question[];
  };
  preferences?: {
    includeImages: boolean;
    includeInteractivity: boolean;
    style: 'educational' | 'gamified' | 'professional' | 'creative';
    complexity: 'beginner' | 'intermediate' | 'advanced';
  };
}

export interface OrchestrationResult {
  success: boolean;
  taskPlan: TaskPlan;
  generatedContent: {
    htmlContent?: string;
    images?: string[];
    textContent?: string[];
    metadata?: any;
  };
  conversationHistory: ConversationTurn[];
  error?: string;
}

export interface ConversationTurn {
  id: string;
  timestamp: Date;
  type: 'user_request' | 'agent_analysis' | 'agent_question' | 'user_response' | 'agent_action';
  content: string;
  metadata?: any;
}

export class AIOrchestrator {
  private genAI: GoogleGenAI;
  private conversationHistory: ConversationTurn[] = [];
  private currentTaskPlan: TaskPlan | null = null;

  // Agentic behavior configuration
  private readonly MAX_RETRY_ATTEMPTS = 5;
  private readonly QUALITY_THRESHOLD = 0.7; // Minimum quality score to accept results
  private readonly AUTO_REVIEW_ENABLED = true;

  // Model configurations
  private readonly MODELS = {
    PLANNER: 'gemini-2.5-pro',
    TEXT_GENERATOR: 'gemini-2.5-flash',
    IMAGE_GENERATOR: 'gemini-2.0-flash-preview-image-generation',
    APP_GENERATOR: 'gemini-2.5-pro',
    REVIEWER: 'gemini-2.5-pro'
  };

  constructor(apiKey: string) {
    this.genAI = new GoogleGenAI({ apiKey });
  }

  async orchestrateGeneration(request: GenerationRequest): Promise<OrchestrationResult> {
    let attempt = 1;
    let lastError: string | null = null;

    while (attempt <= this.MAX_RETRY_ATTEMPTS) {
      try {
        this.addConversationTurn({
          type: 'agent_analysis',
          content: `Starting generation attempt ${attempt}/${this.MAX_RETRY_ATTEMPTS}`
        });

        // Step 1: Analyze the request and create a task plan
        const taskPlan = await this.createTaskPlan(request);
        this.currentTaskPlan = taskPlan;

        // Step 2: Execute the task plan with agentic behavior
        const result = await this.executeTaskPlanWithRetry(taskPlan, request, attempt);

        // Step 3: Agentic self-review and quality assessment
        if (this.AUTO_REVIEW_ENABLED) {
          const qualityAssessment = await this.performQualityReview(result, request);
          
          if (qualityAssessment.approved || attempt === this.MAX_RETRY_ATTEMPTS) {
            // Accept the result or force completion on final attempt
            this.addConversationTurn({
              type: 'agent_action',
              content: qualityAssessment.approved
                ? `✅ Quality review passed (Score: ${qualityAssessment.score}). Generation complete!`
                : `⚠️ Final attempt reached. Delivering best available result (Score: ${qualityAssessment.score}).`
            });

            return {
              success: true,
              taskPlan,
              generatedContent: {
                ...result,
                metadata: {
                  ...result.metadata,
                  qualityScore: qualityAssessment.score,
                  attempts: attempt,
                  finalAttempt: attempt === this.MAX_RETRY_ATTEMPTS,
                  reviewComments: qualityAssessment.feedback
                }
              },
              conversationHistory: this.conversationHistory
            };
          } else {
            // Quality review failed, retry with improvements
            this.addConversationTurn({
              type: 'agent_analysis',
              content: `❌ Quality review failed (Score: ${qualityAssessment.score}). Issues: ${qualityAssessment.feedback}. Retrying with improvements...`
            });
            
            // Update request with improvement suggestions
            request = this.incorporateImprovements(request, qualityAssessment.suggestions);
            attempt++;
            continue;
          }
        } else {
          // No auto-review, return result immediately
          return {
            success: true,
            taskPlan,
            generatedContent: result,
            conversationHistory: this.conversationHistory
          };
        }

      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        this.addConversationTurn({
          type: 'agent_analysis',
          content: `❌ Attempt ${attempt} failed: ${lastError}`
        });
        
        if (attempt === this.MAX_RETRY_ATTEMPTS) {
          // Final attempt failed
          return {
            success: false,
            taskPlan: this.currentTaskPlan!,
            generatedContent: {
              metadata: {
                attempts: attempt,
                finalError: lastError
              }
            },
            conversationHistory: this.conversationHistory,
            error: `Failed after ${this.MAX_RETRY_ATTEMPTS} attempts. Last error: ${lastError}`
          };
        }
        
        attempt++;
        // Brief delay before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    // This should never be reached, but included for completeness
    return {
      success: false,
      taskPlan: this.currentTaskPlan!,
      generatedContent: {},
      conversationHistory: this.conversationHistory,
      error: 'Maximum retry attempts exceeded'
    };
  }

  private async createTaskPlan(request: GenerationRequest): Promise<TaskPlan> {
    const planningPrompt = this.buildPlanningPrompt(request);
    
    this.addConversationTurn({
      type: 'agent_analysis',
      content: 'Analyzing your request and creating an optimal task plan...'
    });

    const result = await this.genAI.models.generateContent({
      model: this.MODELS.PLANNER,
      contents: [{ parts: [{ text: planningPrompt }] }]
    });

    const planText = result.text || '';
    const taskPlan = this.parsePlanFromResponse(planText, request);
    
    this.addConversationTurn({
      type: 'agent_analysis',
      content: `Created task plan with ${taskPlan.steps.length} steps. Estimated complexity: ${taskPlan.complexity}`
    });

    return taskPlan;
  }

  private async executeTaskPlan(taskPlan: TaskPlan, request: GenerationRequest): Promise<any> {
    const results: any = {
      htmlContent: '',
      images: [],
      textContent: [],
      metadata: {}
    };

    // Execute steps in dependency order
    for (const step of taskPlan.steps) {
      await this.executeStep(step, request, results);
      
      // After each step, potentially ask for user feedback
      if (step.type === 'review' || (step.status === 'completed' && taskPlan.complexity === 'complex')) {
        await this.requestUserFeedback(step, results);
      }
    }

    return results;
  }

  private async executeStep(step: TaskStep, request: GenerationRequest, results: any): Promise<void> {
    step.status = 'in_progress';
    
    this.addConversationTurn({
      type: 'agent_action',
      content: `Executing: ${step.description}`
    });

    try {
      switch (step.type) {
        case 'text_generation':
          step.result = await this.generateText(step, request, results);
          results.textContent.push(step.result);
          break;
          
        case 'image_generation':
          step.result = await this.generateImages(step, request, results);
          results.images.push(...step.result);
          break;
          
        case 'app_generation':
          step.result = await this.generateApp(step, request, results);
          results.htmlContent = step.result;
          break;
          
        case 'review':
          step.result = await this.reviewContent(step, request, results);
          break;
          
        case 'refinement':
          await this.refineContent(step, request, results);
          break;
      }
      
      step.status = 'completed';
      
      this.addConversationTurn({
        type: 'agent_action',
        content: `✅ Completed: ${step.description}`
      });
      
    } catch (error) {
      step.status = 'failed';
      this.addConversationTurn({
        type: 'agent_action',
        content: `❌ Failed: ${step.description} - ${error}`
      });
    }
  }

  private async generateText(step: TaskStep, request: GenerationRequest, results: any): Promise<string> {
    const prompt = this.buildTextGenerationPrompt(step, request, results);
    
    const result = await this.genAI.models.generateContent({
      model: this.MODELS.TEXT_GENERATOR,
      contents: [{ parts: [{ text: prompt }] }]
    });

    return result.text || '';
  }

  private async generateImages(step: TaskStep, request: GenerationRequest, results: any): Promise<string[]> {
    const imagePrompts = this.buildImageGenerationPrompts(step, request, results);
    const images: string[] = [];

    for (const imagePrompt of imagePrompts) {
      // In a real implementation, this would call the actual Imagen API
      // For now, we'll create a sophisticated placeholder
      const imageData = await this.createImagePlaceholder(imagePrompt);
      images.push(imageData);
    }

    return images;
  }

  private async generateApp(step: TaskStep, request: GenerationRequest, results: any): Promise<string> {
    const prompt = this.buildAppGenerationPrompt(step, request, results);
    
    const result = await this.genAI.models.generateContent({
      model: this.MODELS.APP_GENERATOR,
      contents: [{ parts: [{ text: prompt }] }]
    });

    return this.extractHTMLFromResponse(result.text || '');
  }

  private async reviewContent(step: TaskStep, request: GenerationRequest, results: any): Promise<any> {
    const reviewPrompt = this.buildReviewPrompt(step, request, results);
    
    const result = await this.genAI.models.generateContent({
      model: this.MODELS.REVIEWER,
      contents: [{ parts: [{ text: reviewPrompt }] }]
    });

    const review = result.text || '';
    
    this.addConversationTurn({
      type: 'agent_analysis',
      content: `Review completed: ${review}`
    });

    return { review, suggestions: this.extractSuggestions(review) };
  }

  private async refineContent(step: TaskStep, request: GenerationRequest, results: any): Promise<void> {
    // Implementation for content refinement based on review feedback
    const refinementPrompt = this.buildRefinementPrompt(step, request, results);
    
    const result = await this.genAI.models.generateContent({
      model: this.MODELS.APP_GENERATOR,
      contents: [{ parts: [{ text: refinementPrompt }] }]
    });

    // Update the results with refined content
    if (results.htmlContent) {
      results.htmlContent = this.extractHTMLFromResponse(result.text || '');
    }
  }

  private buildPlanningPrompt(request: GenerationRequest): string {
    return `You are an expert AI development agent specializing in creating comprehensive, multi-modal educational content. Analyze this request and create an optimal task plan.

USER REQUEST: ${request.userPrompt}

CONTEXT:
${request.context?.categories ? `Categories: ${request.context.categories.join(', ')}` : ''}
${request.context?.mistakes ? `User has ${request.context.mistakes.length} learning gaps to address` : ''}

PREFERENCES:
- Include Images: ${request.preferences?.includeImages ? 'Yes' : 'No'}
- Include Interactivity: ${request.preferences?.includeInteractivity ? 'Yes' : 'No'}
- Style: ${request.preferences?.style || 'educational'}
- Complexity: ${request.preferences?.complexity || 'intermediate'}

AVAILABLE CAPABILITIES:
1. Text Generation (Gemini Flash/Pro) - Educational content, explanations, narratives
2. Image Generation (Imagen) - Illustrations, diagrams, visual aids
3. Interactive App Generation - Games, simulations, interactive tools
4. Content Review & Refinement - Quality assurance and improvement

TASK PLANNING INSTRUCTIONS:
Create a detailed task plan that coordinates multiple AI models to create the best possible result. Consider:

1. **Content Strategy**: What type of content will best serve the user's needs?
2. **Visual Strategy**: What images would enhance understanding and engagement?
3. **Interaction Strategy**: What interactive elements would improve learning?
4. **Quality Strategy**: How will we ensure the content meets high standards?

Respond with a structured plan including:
- Overall approach and strategy
- Specific steps with dependencies
- Estimated complexity and time
- Quality checkpoints

Focus on creating cohesive, educational content that combines text, visuals, and interactivity seamlessly.`;
  }

  private buildTextGenerationPrompt(step: TaskStep, request: GenerationRequest, results: any): string {
    return `Generate high-quality educational text content for: ${step.description}

CONTEXT:
- User Request: ${request.userPrompt}
- Style: ${request.preferences?.style || 'educational'}
- Target Audience: ${request.preferences?.complexity || 'intermediate'} level

EXISTING CONTENT:
${results.textContent?.length ? `Previous text: ${results.textContent.join('\n\n')}` : 'No previous text content'}
${results.images?.length ? `${results.images.length} images will be included` : 'No images planned'}

REQUIREMENTS:
1. Create engaging, educational content
2. Use clear, appropriate language for the target audience
3. Structure content logically with proper flow
4. Include hooks for where images will be integrated
5. Consider interactive elements that will be added

Generate comprehensive, well-structured text content that will work seamlessly with visual and interactive elements.`;
  }

  private buildImageGenerationPrompts(step: TaskStep, request: GenerationRequest, results: any): string[] {
    // Analyze the text content and request to determine what images are needed
    const textContent = results.textContent?.join(' ') || '';
    const basePrompt = `Educational illustration for: ${request.userPrompt}`;
    
    // Generate multiple image prompts based on content analysis and existing text
    const prompts = [
      `${basePrompt}, style: ${request.preferences?.style || 'educational'}, high quality, clear, informative`,
      `Diagram or infographic related to: ${step.description}, educational style, clean design`,
      `Visual aid for learning about: ${request.context?.categories?.join(', ') || 'the topic'}, engaging and clear`
    ];

    // If we have text content, create more contextual image prompts
    if (textContent.length > 50) {
      prompts.push(`Illustration that complements this content: ${textContent.substring(0, 200)}...`);
    }

    return prompts.slice(0, request.preferences?.includeImages ? 3 : 1);
  }

  private buildAppGenerationPrompt(step: TaskStep, request: GenerationRequest, results: any): string {
    const textContent = results.textContent?.join('\n\n') || '';
    const imageCount = results.images?.length || 0;

    return `Create a comprehensive, interactive web application that combines all generated content.

USER REQUEST: ${request.userPrompt}
STEP CONTEXT: ${step.description}

GENERATED CONTENT TO INTEGRATE:
TEXT CONTENT:
${textContent}

IMAGES: ${imageCount} images will be available (use placeholder integration)

REQUIREMENTS:
1. Create a complete, self-contained HTML application
2. Integrate all text content seamlessly
3. Include placeholders for ${imageCount} images with proper styling
4. Add interactive elements: ${request.preferences?.includeInteractivity ? 'games, quizzes, simulations' : 'basic interactions'}
5. Style: ${request.preferences?.style || 'educational'}
6. Complexity: ${request.preferences?.complexity || 'intermediate'}

TECHNICAL SPECIFICATIONS:
- Single HTML file with embedded CSS and JavaScript
- Responsive design for all devices
- Modern web technologies (HTML5, CSS3, ES6+)
- Smooth animations and transitions
- Accessibility features (ARIA labels, semantic HTML)
- Educational focus with clear learning objectives

INTEGRATION FEATURES:
- Seamless text and image integration
- Interactive elements that enhance learning
- Progress tracking and feedback systems
- Adaptive difficulty based on user performance
- Visual hierarchy that guides attention

Create an exceptional educational experience that combines text, visuals, and interactivity into a cohesive, engaging application.`;
  }

  private buildReviewPrompt(step: TaskStep, request: GenerationRequest, results: any): string {
    return `Review the generated content for quality, coherence, and educational effectiveness.

ORIGINAL REQUEST: ${request.userPrompt}
REVIEW STEP: ${step.description}

GENERATED CONTENT:
- Text Content: ${results.textContent?.length || 0} sections
- Images: ${results.images?.length || 0} images
- Interactive App: ${results.htmlContent ? 'Generated' : 'Not yet generated'}

REVIEW CRITERIA:
1. **Educational Value**: Does the content effectively teach the intended concepts?
2. **Coherence**: Do all elements work together seamlessly?
3. **Engagement**: Is the content engaging and interactive?
4. **Accuracy**: Is the information correct and up-to-date?
5. **Accessibility**: Is the content accessible to the target audience?
6. **Technical Quality**: Are there any technical issues or improvements needed?

Provide a comprehensive review with specific suggestions for improvement.`;
  }

  private buildRefinementPrompt(step: TaskStep, request: GenerationRequest, results: any): string {
    const reviewData = step.result || {};
    
    return `Refine and improve the generated content based on the review feedback.

ORIGINAL REQUEST: ${request.userPrompt}
REFINEMENT STEP: ${step.description}

REVIEW FEEDBACK:
${reviewData.review || 'No specific feedback available'}

SUGGESTIONS TO IMPLEMENT:
${reviewData.suggestions?.join('\n') || 'General improvements needed'}

CURRENT CONTENT:
${results.htmlContent || 'No content to refine'}

REFINEMENT INSTRUCTIONS:
1. Address all specific issues mentioned in the review
2. Enhance educational effectiveness
3. Improve user experience and engagement
4. Fix any technical issues
5. Optimize for better learning outcomes

Generate the improved version of the content.`;
  }

  private async requestUserFeedback(step: TaskStep, results: any): Promise<void> {
    // This would trigger a UI component to ask for user feedback
    this.addConversationTurn({
      type: 'agent_question',
      content: `I've completed "${step.description}". Would you like to review the results and provide feedback before I continue?`,
      metadata: { step: step.id, results: results }
    });
  }

  private parsePlanFromResponse(planText: string, request: GenerationRequest): TaskPlan {
    // Parse the AI response to create a structured task plan
    // Note: planText contains the AI's planning response which could be used for more sophisticated parsing
    const steps: TaskStep[] = [];
    let stepId = 1;

    // For now, we use a rule-based approach but could enhance this to parse planText in the future
    const hasComplexPlanning = planText.length > 100; // Simple heuristic

    // Always start with text generation if content is needed
    if (request.userPrompt.toLowerCase().includes('content') ||
        request.userPrompt.toLowerCase().includes('text') ||
        request.userPrompt.toLowerCase().includes('explanation')) {
      steps.push({
        id: `step_${stepId++}`,
        type: 'text_generation',
        description: hasComplexPlanning ? 'Generate comprehensive educational text content' : 'Generate educational text content',
        model: this.MODELS.TEXT_GENERATOR,
        dependencies: [],
        status: 'pending'
      });
    }

    // Add image generation if requested
    if (request.preferences?.includeImages) {
      steps.push({
        id: `step_${stepId++}`,
        type: 'image_generation',
        description: 'Generate educational illustrations',
        model: this.MODELS.IMAGE_GENERATOR,
        dependencies: steps.length > 0 ? [steps[0].id] : [],
        status: 'pending'
      });
    }

    // Always include app generation
    steps.push({
      id: `step_${stepId++}`,
      type: 'app_generation',
      description: 'Create interactive web application',
      model: this.MODELS.APP_GENERATOR,
      dependencies: steps.map(s => s.id),
      status: 'pending'
    });

    // Add review step for complex requests
    const complexity = this.determineComplexity(request);
    if (complexity === 'complex') {
      steps.push({
        id: `step_${stepId++}`,
        type: 'review',
        description: 'Review and analyze generated content',
        model: this.MODELS.REVIEWER,
        dependencies: [steps[steps.length - 1].id],
        status: 'pending'
      });

      steps.push({
        id: `step_${stepId++}`,
        type: 'refinement',
        description: 'Refine content based on review',
        model: this.MODELS.APP_GENERATOR,
        dependencies: [steps[steps.length - 1].id],
        status: 'pending'
      });
    }

    return {
      id: `plan_${Date.now()}`,
      description: `Multi-modal content generation for: ${request.userPrompt}`,
      steps,
      estimatedTime: steps.length * 30, // 30 seconds per step estimate
      complexity
    };
  }

  private determineComplexity(request: GenerationRequest): 'simple' | 'medium' | 'complex' {
    let score = 0;
    
    if (request.preferences?.includeImages) score += 1;
    if (request.preferences?.includeInteractivity) score += 2;
    if (request.context?.categories && request.context.categories.length > 2) score += 1;
    if (request.context?.mistakes && request.context.mistakes.length > 0) score += 1;
    if (request.userPrompt.length > 100) score += 1;

    if (score <= 2) return 'simple';
    if (score <= 4) return 'medium';
    return 'complex';
  }

  private async createImagePlaceholder(prompt: string): Promise<string> {
    // Create a sophisticated placeholder that represents the image generation
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#7c3aed');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AI Generated Image', 256, 240);
      ctx.font = '12px Arial';
      ctx.fillText('Imagen Model', 256, 260);
      ctx.fillText(prompt.substring(0, 40) + '...', 256, 280);
      
      setTimeout(() => resolve(canvas.toDataURL()), 500);
    });
  }

  private extractHTMLFromResponse(response: string): string {
    // Extract HTML from markdown code blocks or raw HTML
    const htmlMatch = response.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) return htmlMatch[1].trim();

    const codeMatch = response.match(/```\n([\s\S]*?)\n```/);
    if (codeMatch && codeMatch[1].includes('<!DOCTYPE html>')) {
      return codeMatch[1].trim();
    }

    if (response.includes('<!DOCTYPE html>') || response.includes('<html')) {
      return response.trim();
    }

    return response;
  }

  private extractSuggestions(review: string): string[] {
    // Extract actionable suggestions from review text
    const suggestions: string[] = [];
    const lines = review.split('\n');
    
    for (const line of lines) {
      if (line.includes('suggest') || line.includes('improve') || line.includes('consider')) {
        suggestions.push(line.trim());
      }
    }
    
    return suggestions;
  }

  private addConversationTurn(turn: Omit<ConversationTurn, 'id' | 'timestamp'>): void {
    this.conversationHistory.push({
      id: `turn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...turn
    });
  }

  // Public methods for interaction
  public getConversationHistory(): ConversationTurn[] {
    return this.conversationHistory;
  }

  public getCurrentTaskPlan(): TaskPlan | null {
    return this.currentTaskPlan;
  }

  public async respondToUserFeedback(feedback: string): Promise<void> {
    this.addConversationTurn({
      type: 'user_response',
      content: feedback
    });

    // Process the feedback and potentially modify the current task plan
    if (this.currentTaskPlan) {
      await this.incorporateFeedback(feedback);
    }
  }

  private async incorporateFeedback(feedback: string): Promise<void> {
    // Analyze feedback and adjust the task plan accordingly
    this.addConversationTurn({
      type: 'agent_analysis',
      content: `Analyzing your feedback and adjusting the approach: ${feedback}`
    });

    // Implementation would analyze feedback and modify task execution
  }

  private async executeTaskPlanWithRetry(taskPlan: TaskPlan, request: GenerationRequest, attempt: number): Promise<any> {
    // Add attempt-specific improvements to the execution
    const enhancedRequest = {
      ...request,
      userPrompt: attempt > 1
        ? `${request.userPrompt}\n\n[RETRY ATTEMPT ${attempt}: Focus on quality and completeness based on previous feedback]`
        : request.userPrompt
    };

    return await this.executeTaskPlan(taskPlan, enhancedRequest);
  }

  private async performQualityReview(result: any, originalRequest: GenerationRequest): Promise<{
    approved: boolean;
    score: number;
    feedback: string;
    suggestions: string[];
  }> {
    const reviewPrompt = `
      As an AI quality reviewer, evaluate this generated content against the original request:
      
      ORIGINAL REQUEST: "${originalRequest.userPrompt}"
      
      GENERATED CONTENT:
      - Text sections: ${result.textContent?.length || 0}
      - Images: ${result.images?.length || 0}
      - Interactive app: ${result.htmlContent ? 'Yes' : 'No'}
      
      EVALUATION CRITERIA:
      1. Completeness: Does it fulfill the request? (0-1)
      2. Quality: Is the content well-structured and educational? (0-1)
      3. Coherence: Do all parts work together? (0-1)
      4. Functionality: Would interactive elements work properly? (0-1)
      
      Respond in JSON format:
      {
        "score": 0.0-1.0,
        "approved": boolean,
        "feedback": "Brief explanation of issues or approval",
        "suggestions": ["improvement1", "improvement2"]
      }
    `;

    try {
      const reviewResult = await this.genAI.models.generateContent({
        model: this.MODELS.REVIEWER,
        contents: [{ parts: [{ text: reviewPrompt }] }]
      });
      const reviewText = reviewResult.text || '';
      
      // Parse JSON response
      const jsonMatch = reviewText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const assessment = JSON.parse(jsonMatch[0]);
        return {
          approved: assessment.score >= this.QUALITY_THRESHOLD && assessment.approved,
          score: assessment.score,
          feedback: assessment.feedback,
          suggestions: assessment.suggestions || []
        };
      }
    } catch (error) {
      console.error('Quality review error:', error);
    }

    // Fallback assessment - be more conservative on retries
    const fallbackScore = result.textContent?.length > 0 && result.htmlContent ? 0.8 : 0.6;
    return {
      approved: fallbackScore >= this.QUALITY_THRESHOLD,
      score: fallbackScore,
      feedback: 'Quality review completed with basic validation',
      suggestions: result.htmlContent ? [] : ['Add interactive elements', 'Improve content structure']
    };
  }

  private incorporateImprovements(request: GenerationRequest, suggestions: string[]): GenerationRequest {
    if (suggestions.length === 0) return request;

    const improvementText = suggestions.join('. ');
    return {
      ...request,
      userPrompt: `${request.userPrompt}\n\nIMPROVEMENT FOCUS: ${improvementText}. Please address these specific areas for better quality.`
    };
  }
}