import { Lesson } from '../types/lesson';
import { Question } from '../types/question';

export interface CurriculumIssue {
  scope: 'lesson' | 'question' | 'mapping';
  id: string;
  message: string;
}

export const validateLessonCatalog = (lessons: Lesson[]): CurriculumIssue[] => {
  const issues: CurriculumIssue[] = [];
  const lessonIds = new Set<string>();

  lessons.forEach((lesson) => {
    if (lessonIds.has(lesson.id)) issues.push({ scope: 'lesson', id: lesson.id, message: 'Duplicate lesson ID.' });
    lessonIds.add(lesson.id);
    if (lesson.concepts.length < 2) issues.push({ scope: 'lesson', id: lesson.id, message: 'Deep lessons need at least two concepts.' });
    if (!lesson.blocks.some((block) => block.type === 'interactive')) issues.push({ scope: 'lesson', id: lesson.id, message: 'Deep lessons need at least one coded interactive block.' });
    if (!lesson.blocks.some((block) => block.type === 'checkpoint')) issues.push({ scope: 'lesson', id: lesson.id, message: 'Deep lessons need at least one retrieval checkpoint.' });

    const conceptIds = new Set(lesson.concepts.map((concept) => concept.id));
    const blockIds = new Set<string>();
    lesson.blocks.forEach((block) => {
      if (blockIds.has(block.id)) issues.push({ scope: 'lesson', id: lesson.id, message: `Duplicate block ID: ${block.id}.` });
      blockIds.add(block.id);
      if (block.type === 'checkpoint') {
        if (!block.options.includes(block.correctAnswer)) issues.push({ scope: 'lesson', id: lesson.id, message: `Checkpoint ${block.id} has an answer outside its options.` });
        block.conceptIds.forEach((conceptId) => {
          if (!conceptIds.has(conceptId)) issues.push({ scope: 'lesson', id: lesson.id, message: `Checkpoint ${block.id} references unknown concept ${conceptId}.` });
        });
      }
    });
  });

  lessons.forEach((lesson) => lesson.recommendedLessonIds?.forEach((recommendedId) => {
    if (!lessonIds.has(recommendedId)) issues.push({ scope: 'lesson', id: lesson.id, message: `Unknown recommended lesson: ${recommendedId}.` });
    if (recommendedId === lesson.id) issues.push({ scope: 'lesson', id: lesson.id, message: 'A lesson cannot recommend itself.' });
  }));

  return issues;
};

export const validateQuestionMappings = (
  lessons: Lesson[],
  questions: Question[],
  mappings: Record<string, string[]>,
): CurriculumIssue[] => {
  const issues: CurriculumIssue[] = [];
  const questionIds = new Set<string>();
  const conceptIds = new Set(lessons.flatMap((lesson) => lesson.concepts.map((concept) => concept.id)));

  questions.forEach((question) => {
    if (questionIds.has(question.id)) issues.push({ scope: 'question', id: question.id, message: 'Duplicate question ID.' });
    questionIds.add(question.id);
    const mapped = mappings[question.id] || [];
    if (mapped.length === 0) issues.push({ scope: 'mapping', id: question.id, message: 'Question has no concept mapping.' });
    mapped.forEach((conceptId) => {
      if (!conceptIds.has(conceptId)) issues.push({ scope: 'mapping', id: question.id, message: `Unknown concept mapping: ${conceptId}.` });
    });
  });

  Object.keys(mappings).forEach((questionId) => {
    if (!questionIds.has(questionId) && questionId.includes('_')) {
      const isCrossDomain = /^(physics|chem|bio|stats|econ|cs|music|earth|math|finance|astronomy|ecology|logic|demography|psych|ling|vision|game)_/.test(questionId);
      if (isCrossDomain) issues.push({ scope: 'mapping', id: questionId, message: 'Mapping points to a missing cross-domain question.' });
    }
  });

  return issues;
};

export const assertValidCurriculum = (issues: CurriculumIssue[], label: string): void => {
  if (issues.length === 0) return;
  const detail = issues.map((issue) => `${issue.scope}:${issue.id} — ${issue.message}`).join('\n');
  throw new Error(`${label} failed curriculum validation:\n${detail}`);
};
