export enum GameMode {
  QUIZ_ADVENTURE = 'quiz_adventure',
  FREE_EXPLORATION = 'free_exploration',
}

export interface Question {
  topic: string;
  question: string;
  answer: string;
  wrongOptions: string[];
  answered?: boolean;
}

export interface Stat {
    name: string;
    value: number;
    maxValue?: number;
}

export interface WorldState {
  characterDescription?: string;
  worldDescription?: string;
  antagonist?: string;
  mission?: string;
  locations?: string[];
  npcs?: string[];
  inventory?: string[];
  journal?: string;
  worldFlags?: string[];
}

export interface Scene {
  narrative: string;
  image: string | null;
  choices: string[];
  stats: Stat[];
  worldUpdate?: any;
  isQuiz?: boolean;
  quizQuestion?: string;
  quizOptions?: string[];
  correctAnswer?: string;
  interactionMode?: 'world' | 'dialogue';
  dialoguePartner?: string;
  // New properties for narrative structure
  isBossEncounter?: boolean;
  storyCircleStep?: number;
  missionObjective?: string;
  turnsRemaining?: number;
  gameOver?: {
    isGameOver: boolean;
    message: string;
    isVictory: boolean;
  };
}

export interface InitialQuizScene extends Scene {
  worldState: Partial<WorldState>;
}

export interface InitialFreeExploreScene extends Scene {
  worldState: Partial<WorldState>;
}

export interface QuestionPack {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  icon: React.FC;
}

export interface WorldPreset {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: React.FC;
}

export interface HeroPreset {
    id: string;
    name: string;
    description: string;
    prompt: string;
    icon: React.FC;
}