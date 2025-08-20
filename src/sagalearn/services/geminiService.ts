import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { Scene, Question, InitialQuizScene, InitialFreeExploreScene, Stat, WorldState } from '../types';

let ai: GoogleGenAI;

const initializeAI = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  ai = new GoogleGenAI({ apiKey });
};

const textModel = 'gemini-2.5-flash';
const imageModel = 'gemini-2.0-flash-preview-image-generation';

const GAME_MASTER_PERSONA = `You are the SagaLearn Game Master, a master storyteller and world-builder. Your goal is to create a living, breathing world that is immersive, consistent, and proactive. Track the player's stats and update them based on their actions. Respond only in the requested JSON format.`;

const statsSchema = {
    type: Type.ARRAY,
    description: "The character's list of stats. **MUST** be returned fully with every turn.",
    items: {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING },
            value: { type: Type.NUMBER },
            maxValue: { type: Type.NUMBER, description: "The maximum value for this stat. Omit for countable items like money or ammo." }
        },
        required: ["name", "value"]
    }
};

const STAT_GENERATION_RULES = "Generate EXACTLY THREE character stats. The FIRST stat MUST be named 'Health' with its value and maxValue set to 100. The other TWO stats MUST be simple, one-word, concrete resources relevant to the theme (examples: Mana, Stamina, Ammo, Energy, Gold, Arrows). These resource names must be single words. DO NOT use abstract concepts (like 'Resolve', 'Courage') or multi-word names. For stats that are a resource pool (like Mana or Stamina), provide a 'maxValue'. For stats that are a countable item (like Gold or Ammo), OMIT the 'maxValue' property.";

const worldUpdateSchema = {
    type: Type.OBJECT,
    description: "Fields for updating the game state.",
    properties: {
        event: { type: Type.STRING, description: "A significant event or change in the world state, if any." },
        inventoryToAdd: { type: Type.ARRAY, description: "A list of new items the player has acquired.", items: { type: Type.STRING } },
        inventoryToRemove: { type: Type.ARRAY, description: "A list of items the player has used or lost.", items: { type: Type.STRING } },
        journalUpdate: { type: Type.STRING, description: "A new or updated journal entry for the player's quest log." },
        worldFlagsToAdd: { type: Type.ARRAY, description: "Permanent, one-word flags to add to the world state (e.g., 'king_is_angry').", items: { type: Type.STRING } },
    }
};


abstract class GeminiGameEngine {
  public worldState: Partial<WorldState> = {
    inventory: [],
    journal: "The adventure has just begun.",
    worldFlags: [],
  };
  protected imageHistory: string[] = [];
  protected history: string[] = [];
  public characterStats: Stat[] = [];

  protected async generateTextAndImage(prompt: string, schema: any, previousImage: string | null = null): Promise<any> {
    try {
      const fullPrompt = `${GAME_MASTER_PERSONA}\n\n${prompt}`;
      const textResponse = await ai.models.generateContent({
        model: textModel,
        contents: fullPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const textData = JSON.parse(textResponse.text);
      const imagePrompt = textData.imagePrompt;
      let imageBase64: string | null = null;
      
      this.characterStats = textData.stats;

      if (imagePrompt) {
        const imageContents: any[] = [{ text: imagePrompt }];
        if (previousImage) {
          imageContents.push({
            inlineData: { mimeType: 'image/jpeg', data: previousImage }
          });
          imageContents.push({
            text: "Use the provided image as a strong reference for character appearance, art style, and world consistency."
          });
        }

        const imageGenResponse = await ai.models.generateContent({
          model: imageModel,
          contents: imageContents,
          config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
          },
        });
        
        if (imageGenResponse.candidates && imageGenResponse.candidates[0].content.parts) {
            for (const part of imageGenResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    imageBase64 = part.inlineData.data;
                    break;
                }
            }
        }
      }

      return { ...textData, image: imageBase64 };

    } catch (error) {
      console.error("Error during content generation:", error);
      return {
        narrative: "An unexpected disturbance ripples through the fabric of reality. The world shimmers and fades for a moment. Please try your action again.",
        image: null,
        choices: ["Try again"],
        stats: this.characterStats,
        worldUpdate: {},
        interactionMode: 'world',
        gameOver: { isGameOver: false }
      };
    }
  }

  protected updateWorldState(worldUpdate: any) {
    if (!worldUpdate) return;
    
    if (worldUpdate.inventoryToAdd) {
        this.worldState.inventory = [...(this.worldState.inventory || []), ...worldUpdate.inventoryToAdd];
    }
    if (worldUpdate.inventoryToRemove) {
        this.worldState.inventory = (this.worldState.inventory || []).filter(item => !worldUpdate.inventoryToRemove.includes(item));
    }
    if (worldUpdate.journalUpdate) {
        this.worldState.journal = worldUpdate.journalUpdate;
    }
    if (worldUpdate.worldFlagsToAdd) {
        this.worldState.worldFlags = [...new Set([...(this.worldState.worldFlags || []), ...worldUpdate.worldFlagsToAdd])];
    }
  }
}

export class QuizAdventureEngine extends GeminiGameEngine {
  private missionState = {
    objective: null as string | null,
    turnsRemaining: 15,
    storyCircleStep: 1,
  };
  private lessonQuestions: Question[] = [];

  constructor(apiKey: string) {
    super();
    initializeAI(apiKey);
  }

  async initializeMission(worldTheme: string, questions: Question[], heroDescription: string): Promise<InitialQuizScene> {
    this.lessonQuestions = questions.map(q => ({...q, answered: false}));
    this.history = [];
    this.worldState = { inventory: [], journal: "The adventure is about to begin.", worldFlags: [] };
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            narrative: { type: Type.STRING, description: "Describe the hero's ordinary world (Story Circle Step 1)." },
            choices: { type: Type.ARRAY, items: { type: Type.STRING } },
            stats: {...statsSchema, description: STAT_GENERATION_RULES },
            worldUpdate: {
                type: Type.OBJECT, properties: {
                    mission: { type: Type.STRING, description: "The overall mission objective." },
                    characterDescription: { type: Type.STRING, description: "A detailed description of the hero, inspired by user input." },
                    antagonist: { type: Type.STRING, description: "A description of the main villain." },
                    journalUpdate: { type: Type.STRING, description: "The initial journal entry describing the mission." },
                }, required: ["mission", "characterDescription", "antagonist", "journalUpdate"]
            },
            imagePrompt: { type: Type.STRING, description: "A detailed, painterly prompt for an image generator to create a cover image showing the hero, villain, and world." }
        },
        required: ["narrative", "choices", "worldUpdate", "imagePrompt", "stats"]
    };

    const initPrompt = `You are a master storyteller using Dan Harmon's Story Circle. Create an epic adventure with theme: "${worldTheme}". The hero is described as: "${heroDescription}". Generate a mission, protagonist, antagonist, and initial stats. The starting narrative must represent Step 1 of the Story Circle: The character is in a zone of comfort. Your response must be a JSON object.`;
    
    const result = await this.generateTextAndImage(initPrompt, schema);
    
    this.worldState = { ...this.worldState, ...result.worldUpdate };
    if (result.worldUpdate && result.worldUpdate.mission) {
        this.missionState.objective = result.worldUpdate.mission;
    }
    this.history.push(`Outcome: ${result.narrative}`);
    if (result.image) this.imageHistory.push(result.image);
    return { ...result, worldState: this.worldState, storyCircleStep: 1, turnsRemaining: this.missionState.turnsRemaining, missionObjective: this.missionState.objective };
  }

  async processTurn(playerChoice: string): Promise<Scene> {
    this.missionState.turnsRemaining--;
    this.missionState.storyCircleStep++;
    if (this.missionState.storyCircleStep > 8) this.missionState.storyCircleStep = 8;
    this.history.push(`Player chose: ${playerChoice}`);

    const nextQuestion = this.lessonQuestions.find(q => !q.answered);
    const shouldAskQuestion = nextQuestion && (this.missionState.turnsRemaining % 3 === 0 || this.missionState.turnsRemaining < 5);
    const isBossEncounter = this.missionState.turnsRemaining <= 3 && this.missionState.turnsRemaining > 0;
    const isGameOver = this.missionState.turnsRemaining <= 0;

    const schema = {
        type: Type.OBJECT,
        properties: {
            narrative: { type: Type.STRING },
            choices: { type: Type.ARRAY, items: { type: Type.STRING } },
            stats: {...statsSchema, description: "**CRITICAL**: Return the complete, updated list of stats. The values MUST be changed to reflect the narrative outcome."},
            worldUpdate: worldUpdateSchema,
            isQuiz: { type: Type.BOOLEAN },
            quizQuestion: { type: Type.STRING, description: "A narrative description of a puzzle or challenge." },
            quizOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.STRING },
            gameOver: { type: Type.OBJECT, properties: { isGameOver: { type: Type.BOOLEAN }, message: { type: Type.STRING }, isVictory: { type: Type.BOOLEAN } } },
            imagePrompt: { type: Type.STRING, description: "A detailed prompt for an image generator that visually represents the outcome." }
        },
        required: ["narrative", "choices", "isQuiz", "imagePrompt", "stats", "gameOver"]
    };

    let turnPrompt;

    if (isGameOver) {
        turnPrompt = `The mission has ended because the turn limit was reached. The hero has failed. Describe the tragic outcome and set 'gameOver.isVictory' to false.`;
    } else if (isBossEncounter) {
        turnPrompt = `
        **CLIMACTIC BOSS ENCOUNTER!** This is Story Circle Step 7: The hero returns, having changed.
        The player is confronting the antagonist: ${this.worldState.antagonist}.
        Latest Player Action: "${playerChoice}". Current Stats: ${JSON.stringify(this.characterStats)}.
        Describe a crucial stage of the final battle. The choices must be high-stakes. The outcome MUST heavily impact stats. Do not end the game yet unless their Health is 0.
        `;
    } else {
        turnPrompt = `
        Here is the story so far:
        - ${this.history.join('\n- ')}
        ---
        Current Game State:
        - Story Circle Step: ${this.missionState.storyCircleStep}
        - Mission: ${this.missionState.objective}
        - Turns Remaining: ${this.missionState.turnsRemaining}
        - Character Stats: ${JSON.stringify(this.characterStats)}
        - Inventory: ${JSON.stringify(this.worldState.inventory)}
        - World Context: ${JSON.stringify(this.worldState)}
        
        Based on the player's latest action ("${playerChoice}"), continue the story following Story Circle principles.
        **CRITICAL**: You MUST update the character's stats to reflect the direct consequences of this action.
        **CHOICE GATING**: Generate choices that are possible with the current stats and inventory. If a stat is low, do not offer choices that require it. If an item is present, you can offer a unique choice.

        ${shouldAskQuestion ? `
        **DIEGETIC CHALLENGE**: Weave this knowledge into the story as a puzzle, not a simple quiz.
        Challenge: "${nextQuestion!.question}" | Correct Answer: "${nextQuestion!.answer}" | Wrong Options: ${JSON.stringify(nextQuestion!.wrongOptions)}.
        Example: Instead of asking "What is the capital of France?", describe a scene where the player needs to input "Paris" into a keypad to proceed.
        The 'quizQuestion' field should be the narrative description of the puzzle. A correct answer MUST give a positive stat change. A wrong answer MUST have a negative consequence. Set 'isQuiz' to true.
        ` : `
        Continue the adventure. Do NOT include a quiz. Set "isQuiz" to false.
        `}
        Set 'gameOver.isGameOver' to false unless the hero's health is 0.
        Respond with a JSON object conforming to the provided schema.
        `;
    }

    if(shouldAskQuestion && nextQuestion){
        nextQuestion.answered = true;
    }
    
    const previousImage = this.imageHistory.length > 0 ? this.imageHistory[this.imageHistory.length - 1] : null;
    const result = await this.generateTextAndImage(turnPrompt, schema, previousImage);

    this.updateWorldState(result.worldUpdate);
    this.history.push(`Outcome: ${result.narrative}`);
    if (result.image) this.imageHistory.push(result.image);

    return { ...result, isBossEncounter, turnsRemaining: this.missionState.turnsRemaining, missionObjective: this.missionState.objective, storyCircleStep: this.missionState.storyCircleStep };
  }
}

export class FreeExplorationEngine extends GeminiGameEngine {
    
    constructor(apiKey: string) {
      super();
      initializeAI(apiKey);
    }

    async initializeWorld(worldTheme: string, heroDescription: string, learningTopic?: Question[]): Promise<InitialFreeExploreScene> {
        this.history = [];
        this.worldState = { inventory: [], journal: "The adventure is about to begin.", worldFlags: [] };

        const schema = {
            type: Type.OBJECT,
            properties: {
                narrative: { type: Type.STRING, description: "An introductory narrative that ends with a 'Call to Adventure' (Story Circle Step 2)." },
                choices: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Choices related to the call to adventure, including one to ignore it." },
                stats: {...statsSchema, description: STAT_GENERATION_RULES },
                worldUpdate: {
                    type: Type.OBJECT, properties: {
                        worldDescription: { type: Type.STRING },
                        characterDescription: { type: Type.STRING, description: "A detailed description of the character." },
                        journalUpdate: { type: Type.STRING, description: "A journal entry describing the Call to Adventure." }
                    },
                    required: ["worldDescription", "characterDescription", "journalUpdate"]
                },
                imagePrompt: { type: Type.STRING, description: "A detailed prompt for the starting scene image." }
            },
            required: ["narrative", "choices", "worldUpdate", "imagePrompt", "stats"]
        };

        const learningPrompt = learningTopic ? `This adventure should also subtly include a learning quest related to: ${learningTopic[0].topic}. The 'Call to Adventure' should be tied to this topic.` : `This is a pure exploration adventure with no educational component.`;

        const initPrompt = `Create a rich, explorable world with the theme: "${worldTheme}". The hero is described as: "${heroDescription}". ${learningPrompt} Start the story with a compelling 'Call to adventure' (Story Circle Step 2). Generate the world, character, narrative, choices, and stats. Respond with a JSON object.`;
        
        const result = await this.generateTextAndImage(initPrompt, schema);
        
        this.worldState = { ...this.worldState, ...result.worldUpdate };
        this.history.push(`Outcome: ${result.narrative}`);
        if(result.image) this.imageHistory.push(result.image);
        return { ...result, worldState: this.worldState, interactionMode: 'world' };
    }

    async processPlayerAction(action: string): Promise<Scene> {
        this.history.push(`Player action: "${action}"`);
        const schema = {
            type: Type.OBJECT,
            properties: {
                narrative: { type: Type.STRING },
                choices: { type: Type.ARRAY, items: { type: Type.STRING } },
                stats: {...statsSchema, description: "**CRITICAL**: Return the complete, updated list of stats reflecting the action's outcome."},
                worldUpdate: worldUpdateSchema,
                interactionMode: { type: Type.STRING, enum: ['world', 'dialogue'], description: "Set to 'dialogue' if an NPC is initiating a conversation." },
                dialoguePartner: { type: Type.STRING, description: "The name of the NPC initiating dialogue."},
                imagePrompt: { type: Type.STRING, description: "A detailed prompt for an image generator showing the action's result." }
            },
            required: ["narrative", "choices", "worldUpdate", "imagePrompt", "interactionMode", "stats"]
        };

        const actionPrompt = `
        Here is the story so far:
        - ${this.history.join('\n- ')}
        ---
        Current State:
        - Character Stats: ${JSON.stringify(this.characterStats)}
        - Inventory: ${JSON.stringify(this.worldState.inventory)}
        - World Flags: ${JSON.stringify(this.worldState.worldFlags)}
        - World Context: ${JSON.stringify(this.worldState)}
        
        Player's Latest Action: "${action}"
        
        Continue the story. 
        **CRITICAL**: Update stats to reflect the action's consequences. An action MUST have a tangible stat effect.
        **CHOICE GATING**: Choices MUST be logical based on stats and inventory. If an item is needed, don't show the choice. If an item is present, you CAN add a unique choice.
        **MEMORY**: Do NOT contradict the World Flags. They are permanent truths.
        You can introduce an unexpected event or have an NPC initiate contact. If an NPC starts a conversation, set 'interactionMode' to 'dialogue'.
        If the player makes a major, permanent change to the world, add a world flag.
        Respond with a JSON object.
        `;
        
        const result = await this.processAndPersist(actionPrompt, schema);
        return result;
    }

    async processDialogueTurn(dialogue: string, partner: string): Promise<Scene> {
        this.history.push(`Player says to ${partner}: "${dialogue}"`);
        const schema = {
             type: Type.OBJECT,
            properties: {
                narrative: { type: Type.STRING, description: "The NPC's response to the player's dialogue." },
                choices: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggested replies or actions for the player." },
                stats: {...statsSchema, description: "**CRITICAL**: Update stats if the conversation has a tangible outcome (persuasion, intimidation, etc.)."},
                worldUpdate: worldUpdateSchema,
                interactionMode: { type: Type.STRING, enum: ['world', 'dialogue'], description: "Set to 'world' if the conversation ends." },
                imagePrompt: { type: Type.STRING, description: "An image prompt showing a close-up of the characters talking." }
            },
            required: ["narrative", "choices", "interactionMode", "imagePrompt", "stats"]
        };

        const dialoguePrompt = `
        The player is in a conversation with ${partner}.
        Player's latest dialogue: "${dialogue}"
        ---
        Full History: ${this.history.join(' | ')}
        Current Stats: ${JSON.stringify(this.characterStats)}
        Inventory: ${JSON.stringify(this.worldState.inventory)}

        Continue the conversation naturally. A successful persuasion, intimidation, or a friendly exchange should be reflected in the stats. A hostile or failed conversation MUST also have a stat consequence.
        The player can also perform a world action to end the conversation (e.g. 'walks away'). If they do, describe the result and set 'interactionMode' to 'world'.
        Respond with a JSON object.
        `;

        const result = await this.processAndPersist(dialoguePrompt, schema);
        if(result.interactionMode === 'dialogue') {
            result.dialoguePartner = partner;
        }
        return result;
    }

    private async processAndPersist(prompt: string, schema: any): Promise<Scene> {
        const previousImage = this.imageHistory.length > 0 ? this.imageHistory[this.imageHistory.length - 1] : null;
        const result = await this.generateTextAndImage(prompt, schema, previousImage);

        this.updateWorldState(result.worldUpdate);
        this.history.push(`Outcome: ${result.narrative}`);

        if (result.image) {
          this.imageHistory.push(result.image);
          if (this.imageHistory.length > 5) this.imageHistory.shift(); // Slightly larger history for consistency
        }
        return result;
    }

    getStateForSaving(currentScene: Scene) {
        // Truncate history for saving to avoid exceeding localStorage quota
        const recentHistory = this.history.slice(-50); 
        return {
            worldState: this.worldState,
            history: recentHistory,
            characterStats: this.characterStats,
            lastScene: { ...currentScene, image: null, stats: null }, // Don't save image/stats in scene object
            lastImage: this.imageHistory.length > 0 ? this.imageHistory[this.imageHistory.length - 1] : null
        };
    }

    loadState(savedData: any) {
        this.worldState = savedData.worldState;
        this.history = savedData.history || [];
        this.characterStats = savedData.characterStats || [];
        this.imageHistory = [];
        if (savedData.lastImage) {
            this.imageHistory.push(savedData.lastImage);
        }
        const loadedScene = savedData.lastScene;
        loadedScene.image = savedData.lastImage;
        loadedScene.stats = this.characterStats; // Re-attach stats
        return loadedScene;
    }
}