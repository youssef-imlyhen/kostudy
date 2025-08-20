export interface Mistake {
  questionId: string;
  category: string;
  difficulty: string;
  selectedAnswer: string;
  timestamp: number;
}

export interface Mistakes {
  [key: string]: Mistake[];
}

// Filter unique mistakes based on questionId, category, and difficulty
export const getUniqueMistakes = (mistakesList: Mistake[]): Mistake[] => {
  const uniqueMistakesMap = new Map<string, Mistake>();
  
  mistakesList.forEach(mistake => {
    const key = `${mistake.questionId}-${mistake.category}-${mistake.difficulty}`;
    // Keep the most recent mistake (based on timestamp)
    if (!uniqueMistakesMap.has(key) || uniqueMistakesMap.get(key)!.timestamp < mistake.timestamp) {
      uniqueMistakesMap.set(key, mistake);
    }
  });

  return Array.from(uniqueMistakesMap.values());
};

// Get total count of unique mistakes
export const getTotalUniqueMistakes = (mistakes: Mistakes): number => {
  const allMistakes = Object.values(mistakes).flat();
  return getUniqueMistakes(allMistakes).length;
};