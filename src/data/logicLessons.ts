import { Lesson } from '../types/lesson';

export const logicLessons: Lesson[] = [{
  id: 'truth-tables-expose-rule-structure', title: 'Truth Tables Expose Rule Structure', subtitle: 'Inputs, operators, and every possible case', emoji: '🧩', durationMinutes: 14, difficulty: 'foundation', field: 'Logic', relatedCategory: 'Logic',
  description: 'Toggle propositions, inspect complete truth tables, and separate valid logical structure from whether a claim matches reality.',
  coreQuestion: 'How can we test a logical rule without relying on one persuasive example?',
  firstPrinciple: 'A truth table evaluates a rule across every possible combination of truth values. It reveals structure, not whether starting statements are factually correct.',
  recommendedLessonIds: ['sorting-makes-procedure-visible', 'evidence-changes-belief'],
  learningObjectives: ['Evaluate AND, OR, XOR, implication, and a composite rule.', 'Explain why implication is false only when a true premise leads to a false conclusion.', 'Distinguish logical validity from factual truth.'],
  concepts: [
    { id: 'truth-table', label: 'Truth table', description: 'A complete enumeration of truth-value combinations and rule outputs.' },
    { id: 'logical-implication', label: 'Logical implication', description: 'The rule A → B, false only when A is true and B is false.' },
    { id: 'validity-vs-truth', label: 'Validity versus truth', description: 'Structure can be valid even when premises are false, and true claims can appear in invalid arguments.' },
  ],
  tutorBrief: 'Use concrete toggles before symbolic notation. Spend extra time on implication. Keep validity, soundness, and factual truth distinct.',
  blocks: [
    { id: 'story', type: 'explain', eyebrow: 'First principle', title: 'One example cannot test a rule', body: 'A rule may work for the example you chose and fail elsewhere. A truth table removes that luck by evaluating every possible input combination.' },
    { id: 'lab', type: 'interactive', eyebrow: 'Predict → manipulate', title: 'Walk every row of the rule', body: 'Choose a logical operator, toggle inputs, and compare the highlighted row with the complete table.', visual: 'truth-table', challenge: 'Select implication. Find its only false row. Explain why the other three rows do not violate the promise “if A, then B.”' },
    { id: 'compare', type: 'compare', eyebrow: 'Separate two judgments', title: 'Valid structure versus true premises', left: { label: 'Validity', body: 'If the premises were true, the conclusion could not be false under the rule.' }, right: { label: 'Factual truth', body: 'Whether premises and conclusion accurately describe the world.' } },
    { id: 'c1', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Implication failure', prompt: 'When is A → B false?', options: ['A is true and B is false', 'A is false and B is true', 'Both are false', 'Both are true'], correctAnswer: 'A is true and B is false', explanation: 'That is the only case where A occurs but promised consequence B does not.', conceptIds: ['logical-implication'] },
    { id: 'c2', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'What a table cannot decide', prompt: 'What can a truth table not determine by itself?', options: ['Whether a premise is factually true in the world', 'The output of AND', 'The output of OR', 'All possible input rows'], correctAnswer: 'Whether a premise is factually true in the world', explanation: 'The table evaluates formal combinations. Evidence is needed to establish factual premises.', conceptIds: ['truth-table', 'validity-vs-truth'] },
    { id: 'reflection', type: 'reflection', eyebrow: 'Apply it', title: 'Translate an everyday rule', prompt: 'Write one everyday “if…, then…” claim. Which observation would directly falsify that implication?', placeholder: 'If…, then…. It would fail if…' },
    { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson', items: ['Truth tables test every possible truth-value case.', 'Implication fails when premise holds but conclusion does not.', 'Logical structure and factual evidence solve different problems.', 'Composite rules can be understood by evaluating smaller operators in sequence.'] },
  ],
}];
