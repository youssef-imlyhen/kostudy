import { readFile } from 'node:fs/promises';
import process from 'node:process';

const paths = {
  playerDashboard: 'src/sagalearn/components/PlayerDashboard.tsx',
  quizAdventure: 'src/sagalearn/components/QuizAdventureUI.tsx',
  freeExploration: 'src/sagalearn/components/FreeExplorationUI.tsx',
  questionBank: 'src/screens/QuestionBankScreen.tsx',
};

const entries = await Promise.all(
  Object.entries(paths).map(async ([key, path]) => [key, await readFile(path, 'utf8')]),
);
const source = Object.fromEntries(entries);
const failures = [];

const contracts = [
  ['dashboard dialog primitive', source.playerDashboard, [
    "from '@headlessui/react'",
    '<Dialog open={isOpen} onClose={onClose}',
    '<DialogPanel',
    'id="player-dashboard-dialog"',
    '<DialogTitle',
    'aria-label="Close dashboard"',
    'autoFocus',
    'min-h-11 min-w-11',
  ]],
  ['dashboard tabs', source.playerDashboard, [
    '<TabGroup',
    '<TabList aria-label="Dashboard sections"',
    '<Tab',
    'type="button"',
    '<TabPanels',
    '<TabPanel',
    'min-h-12',
  ]],
  ['quiz dashboard trigger', source.quizAdventure, [
    'aria-haspopup="dialog"',
    'aria-expanded={isDashboardOpen}',
    'aria-controls="player-dashboard-dialog"',
  ]],
  ['free exploration dashboard trigger', source.freeExploration, [
    'aria-haspopup="dialog"',
    'aria-expanded={isDashboardOpen}',
    'aria-controls="player-dashboard-dialog"',
  ]],
  ['question-bank search and selection semantics', source.questionBank, [
    'const searchInputId = useId();',
    '<label htmlFor={searchInputId} className="sr-only">',
    'id={searchInputId}',
    'type="search"',
    'aria-hidden="true"',
    'aria-labelledby={`question-${question.id}-label`}',
    'id={`question-${question.id}-label`}',
    'const selectedFilteredCount = useMemo',
    'const isPartiallySelected = selectedFilteredCount > 0 && !isAllSelected;',
    'selectAllRef.current.indeterminate = isPartiallySelected',
    "aria-checked={isPartiallySelected ? 'mixed' : isAllSelected}",
    'id={selectAllId}',
    'htmlFor={selectAllId}',
    'return current.filter((id) => !filteredIds.has(id));',
  ]],
];

for (const [name, text, markers] of contracts) {
  for (const marker of markers) {
    if (!text.includes(marker)) failures.push(`${name} is missing ${marker}`);
  }
}

if (source.playerDashboard.includes('if (!isOpen) return null;')) {
  failures.push('PlayerDashboard still conditionally returns before its stateful interaction tree.');
}

for (const key of ['playerDashboard', 'quizAdventure', 'freeExploration', 'questionBank']) {
  const unsafeButtons = [...source[key].matchAll(/<button(?![^>]*\btype=)[^>]*>/g)];
  if (unsafeButtons.length) failures.push(`${paths[key]} has ${unsafeButtons.length} button(s) without type="button".`);
}

if (failures.length > 0) {
  console.error('Interaction accessibility validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Interaction accessibility validation passed: dialog, tabs, search, selection, and button semantics checked.');
