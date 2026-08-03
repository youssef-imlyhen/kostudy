import { readFile } from 'node:fs/promises';
import process from 'node:process';

const paths = {
  lessonType: 'src/types/lesson.ts',
  lessonVisual: 'src/components/lessons/LessonVisual.tsx',
  loadingState: 'src/components/lessons/LessonLoadingState.tsx',
  layout: 'src/components/Layout.tsx',
  bottomNav: 'src/components/BottomNav.tsx',
  shellCss: 'src/styles/appShell.css',
  main: 'src/main.tsx',
  geometry: 'src/components/lessons/GeometryTransformLab.tsx',
};

const entries = await Promise.all(
  Object.entries(paths).map(async ([key, path]) => [key, await readFile(path, 'utf8')]),
);
const source = Object.fromEntries(entries);
const failures = [];

const visualType = source.lessonType.match(/export type LessonVisualId =([\s\S]*?);/);
if (!visualType) {
  failures.push('Could not read LessonVisualId union.');
}

const declaredIds = visualType
  ? [...visualType[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
  : [];
const registry = source.lessonVisual.match(/const visuals:[\s\S]*?= \{([\s\S]*?)\n\};/);
if (!registry) {
  failures.push('Could not read LessonVisual registry.');
}

const registeredIds = registry
  ? [...registry[1].matchAll(/^\s*'([^']+)':/gm)].map((match) => match[1])
  : [];
const missingFromRegistry = declaredIds.filter((id) => !registeredIds.includes(id));
const undeclaredRegistryIds = registeredIds.filter((id) => !declaredIds.includes(id));
const duplicateIds = registeredIds.filter((id, index) => registeredIds.indexOf(id) !== index);

if (missingFromRegistry.length) failures.push(`Declared visual IDs missing from registry: ${missingFromRegistry.join(', ')}`);
if (undeclaredRegistryIds.length) failures.push(`Registry IDs missing from LessonVisualId: ${undeclaredRegistryIds.join(', ')}`);
if (duplicateIds.length) failures.push(`Duplicate registry IDs: ${[...new Set(duplicateIds)].join(', ')}`);
if (declaredIds.length < 27) failures.push(`Expected at least 27 lesson visual IDs, found ${declaredIds.length}.`);

const requiredRecentIds = [
  'population-pyramid', 'signal-detection', 'morphology-builder', 'color-context', 'repeated-game',
  'entropy-compression', 'network-diffusion', 'stick-slip', 'geometry-transform', 'electric-circuit',
];
for (const id of requiredRecentIds) {
  if (!registeredIds.includes(id)) failures.push(`Recent lab is not registered: ${id}`);
}

const contracts = [
  ['lesson loading state', source.loadingState, ['role="status"', 'aria-live="polite"', 'aria-busy="true"', 'data-lesson-loading-state', 'Loading interactive lesson lab']],
  ['lesson visual shell', source.lessonVisual, ['LessonLoadingState', 'data-lesson-lab-shell', 'open={isNotebookOpen}', 'onToggle=', 'min-h-11']],
  ['layout shell', source.layout, ['app-main', 'app-bottom-nav', 'min-w-0']],
  ['bottom navigation', source.bottomNav, ['aria-label="Primary navigation"', 'app-bottom-nav-surface', 'app-bottom-nav-content', 'focus-visible:ring-2', 'min-h-11']],
  ['safe-area CSS', source.shellCss, ['--app-bottom-nav-height', 'safe-area-inset-bottom', '--app-bottom-nav-reserved-space', '.app-main', '.app-bottom-nav-surface']],
  ['CSS import', source.main, ["import './styles/appShell.css';"]],
  ['geometry labels', source.geometry, ['aria-label="Horizontal translation"', 'aria-label="Vertical translation"']],
];

for (const [name, text, markers] of contracts) {
  for (const marker of markers) {
    if (!text.includes(marker)) failures.push(`${name} is missing ${marker}`);
  }
}

if (/pb-24|md:pb-28/.test(source.layout)) {
  failures.push('Layout still contains hard-coded bottom-navigation padding guesses.');
}

if (failures.length > 0) {
  console.error('Lesson UX validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Lesson UX validation passed: ${declaredIds.length} declared visuals, ${registeredIds.length} registered visuals.`);
