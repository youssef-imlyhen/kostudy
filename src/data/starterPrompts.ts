import { StarterPrompt } from '../types/aiGenerator';

export const starterPrompts: StarterPrompt[] = [
  {
    id: 'snake-game',
    title: 'Snake Game',
    description: 'Classic snake game with score tracking',
    prompt: 'Create a classic Snake game where the player controls a snake that grows longer as it eats food. Include score tracking, game over conditions, and smooth controls using arrow keys. Make it colorful and fun with a retro arcade style.',
    category: 'game',
    icon: '🐍'
  },
  {
    id: 'interactive-lesson',
    title: 'Interactive Lesson',
    description: 'Educational lesson with visuals and quiz',
    prompt: 'Create an interactive educational lesson about photosynthesis. Include beautiful diagrams, step-by-step explanations with animations, interactive elements where users can click to learn more, and end with a 5-question quiz to test understanding. Make it engaging for middle school students.',
    category: 'lesson',
    icon: '📚'
  },
  {
    id: 'ant-simulation',
    title: 'Ant Colony Simulation',
    description: 'Visual simulation of ant behavior',
    prompt: 'Create a visual simulation of an ant colony where ants move around randomly, find food sources, and leave pheromone trails that other ants follow. Show the emergent behavior of path optimization. Include controls to add/remove food sources and adjust simulation speed.',
    category: 'simulation',
    icon: '🐜'
  },
  {
    id: 'flashcards-app',
    title: 'Digital Flashcards',
    description: 'Interactive flashcard study tool',
    prompt: 'Create a digital flashcard application where users can study vocabulary words. Include flip animations, progress tracking, shuffle mode, and the ability to mark cards as "known" or "needs review". Make it clean and focused for effective studying.',
    category: 'tool',
    icon: '🃏'
  },
  {
    id: 'memory-game',
    title: 'Memory Matching Game',
    description: 'Card matching memory game',
    prompt: 'Create a memory matching game with cards that flip to reveal symbols. Players must find matching pairs. Include different difficulty levels (4x4, 6x6, 8x8 grids), timer, move counter, and celebration animations when completed.',
    category: 'game',
    icon: '🧠'
  },
  {
    id: 'solar-system',
    title: 'Solar System Explorer',
    description: 'Interactive solar system with planet info',
    prompt: 'Create an interactive solar system where planets orbit the sun. Users can click on planets to learn facts about them. Include realistic relative sizes, orbital speeds, and beautiful space visuals. Add a quiz mode about planetary facts.',
    category: 'lesson',
    icon: '🪐'
  }
];