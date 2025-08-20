import Papa from 'papaparse';
import { Question } from '../types/question';

export type ParsedQuestion = Omit<Question, 'id' | 'source'>;

export interface ValidationResult {
  validQuestions: ParsedQuestion[];
  errors: string[];
}

function getQuestionValidationErrors(q: any, index: number): string[] {
  const errors: string[] = [];
  const prefix = `Question ${index + 1}:`;

  if (!q || typeof q !== 'object') {
    errors.push(`Question ${index + 1}: Invalid data format, not an object.`);
    return errors;
  }

  // Base properties
  if (!q.question || typeof q.question !== 'string' || q.question.length === 0) errors.push(`${prefix} 'question' is missing or empty.`);
  if (!q.category || typeof q.category !== 'string' || q.category.length === 0) errors.push(`${prefix} 'category' is missing or empty.`);
  if (!q.difficulty || !['easy', 'medium', 'hard'].includes(q.difficulty)) errors.push(`${prefix} 'difficulty' must be 'easy', 'medium', or 'hard'.`);
  if (typeof q.explanation !== 'string') errors.push(`${prefix} 'explanation' is missing or not a string.`);
  if (!q.type || !['multiple-choice', 'true-false', 'fill-in-the-blank'].includes(q.type)) {
    errors.push(`${prefix} 'type' must be 'multiple-choice', 'true-false', or 'fill-in-the-blank'.`);
    return errors; // Stop validation if type is invalid
  }

  // Type-specific properties
  switch (q.type) {
    case 'multiple-choice':
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`${prefix} 'options' must be an array with at least 2 items.`);
      } else {
        if (q.options.some((opt: any) => typeof opt !== 'string')) errors.push(`${prefix} All 'options' must be strings.`);
        if (typeof q.correctAnswer !== 'string') {
          errors.push(`${prefix} 'correctAnswer' is missing for multiple-choice.`);
        } else if (!q.options.includes(q.correctAnswer)) {
          errors.push(`${prefix} 'correctAnswer' must match one of the 'options'.`);
        }
      }
      break;
    case 'true-false':
      if (typeof q.correctAnswer !== 'boolean') {
        errors.push(`${prefix} 'correctAnswer' must be true or false.`);
      }
      break;
    case 'fill-in-the-blank':
      if (typeof q.correctAnswer !== 'string' || q.correctAnswer.length === 0) {
        errors.push(`${prefix} 'correctAnswer' is missing or empty.`);
      }
      break;
  }
  return errors;
}


export function parseAndValidate(data: string, format: 'json' | 'csv'): ValidationResult {
  let parsedData: any[] = [];
  const allErrors: string[] = [];

  if (format === 'json') {
    try {
      parsedData = JSON.parse(data);
      if (!Array.isArray(parsedData)) {
        return { validQuestions: [], errors: ['JSON data must be an array of questions.'] };
      }
    } catch (e) {
      return { validQuestions: [], errors: ['Invalid JSON format. Check for syntax errors.'] };
    }
  } else { // csv
    try {
      const result = Papa.parse(data, { header: true, skipEmptyLines: true, dynamicTyping: true });
      if (result.errors.length > 0) {
        const csvErrors = result.errors.map(e => `CSV Parsing Error on row ${e.row}: ${e.message}`);
        return { validQuestions: [], errors: csvErrors };
      }
      parsedData = result.data.map((row: any) => {
        const processedRow = { ...row };
        if (processedRow.type === 'multiple-choice' && typeof processedRow.options === 'string') {
           try {
            // Support for options formatted as a JSON array string
            processedRow.options = JSON.parse(processedRow.options);
          } catch (e) {
            // Fallback to semicolon-separated values
            processedRow.options = processedRow.options.split(';').map((s:string) => s.trim());
          }
        }
        return processedRow;
      });
    } catch (e) {
      return { validQuestions: [], errors: ['Failed to parse CSV data.'] };
    }
  }

  const validQuestions: ParsedQuestion[] = [];
  
  parsedData.forEach((q, index) => {
    const validationErrors = getQuestionValidationErrors(q, index);
    if (validationErrors.length === 0) {
      validQuestions.push(q as ParsedQuestion);
    } else {
      allErrors.push(...validationErrors);
    }
  });

  // If there are any errors, reject the entire batch.
  if (allErrors.length > 0) {
    return { validQuestions: [], errors: allErrors };
  }

  return { validQuestions, errors: [] };
}