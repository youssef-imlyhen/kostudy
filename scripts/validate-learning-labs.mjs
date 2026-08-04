import { readFile } from 'node:fs/promises';
import process from 'node:process';

const paths = {
  app: 'src/App.tsx', lessonType: 'src/types/lesson.ts', lessonVisual: 'src/components/lessons/LessonVisual.tsx', lessonCreator: 'src/screens/LessonCreatorScreen.tsx', entropy: 'src/components/lessons/EntropyCompressionLab.tsx', network: 'src/components/lessons/NetworkDiffusionLab.tsx', geometry: 'src/components/lessons/GeometryTransformLab.tsx',
};
const recentLabPaths = ['PopulationMomentumLab.tsx','SignalDetectionLab.tsx','MorphologyLab.tsx','ColorContextLab.tsx','RepeatedGameLab.tsx','EntropyCompressionLab.tsx','NetworkDiffusionLab.tsx','StickSlipLab.tsx','GeometryTransformLab.tsx','CircuitLab.tsx'].map((name) => `src/components/lessons/${name}`);
const entries = await Promise.all(Object.entries(paths).map(async ([key, path]) => [key, await readFile(path, 'utf8')]));
const recentLabs = await Promise.all(recentLabPaths.map(async (path) => ({ path, text: await readFile(path, 'utf8') })));
const source = Object.fromEntries(entries); const failures = [];
const visualType = source.lessonType.match(/export type LessonVisualId =([\s\S]*?);/);
const registry = source.lessonVisual.match(/const visuals:[\s\S]*?= \{([\s\S]*?)\n\};/);
if (!visualType) failures.push('Could not read LessonVisualId union.');
if (!registry) failures.push('Could not read LessonVisual registry.');
const declaredIds = visualType ? [...visualType[1].matchAll(/'([^']+)'/g)].map((match) => match[1]) : [];
const registeredIds = registry ? [...registry[1].matchAll(/^\s*'([^']+)':/gm)].map((match) => match[1]) : [];
for (const id of declaredIds) { if (!registeredIds.includes(id)) failures.push(`Visual ID is missing from LessonVisual registry: ${id}`); if (!source.lessonCreator.includes(`'${id}'`)) failures.push(`Visual ID is missing from LessonCreator allowlist: ${id}`); }
for (const id of registeredIds) if (!declaredIds.includes(id)) failures.push(`Registry contains undeclared visual ID: ${id}`);
if (/\bw-screen\b/.test(source.app)) failures.push('App shell still uses w-screen and can overflow by scrollbar width.');
for (const { path, text } of recentLabs) { if (!text.includes('min-w-0 max-w-full')) failures.push(`${path} is missing the mobile containment root.`); const unsafe=[...text.matchAll(/<button(?![^>]*\btype=)[^>]*>/g)]; if (unsafe.length) failures.push(`${path} has ${unsafe.length} button(s) without type="button".`); }
const contracts=[
 ['network container responsiveness',source.network,['max-w-xl','aspect-square','flex-wrap','basis-40','min-w-[12rem]','overflow-hidden']],
 ['network accessible graphic',source.network,['<title id="network-title">','<desc id="network-description">','aria-labelledby="network-title network-description"','preserveAspectRatio="xMidYMid meet"']],
 ['network non-color status',source.network,['Activation count by step','stepCounts','role="status"','aria-live="polite"','aria-valuetext']],
 ['entropy zero-total fallback',source.entropy,['rawTotal > 0','symbols.map(() => 1 / symbols.length)']],
 ['entropy cumulative fallback',source.entropy,['symbolIndex >= 0 ? symbolIndex : symbols.length - 1']],
 ['positive dilation orientation',source.geometry,["['Angles', 'Parallel lines', 'Shape similarity', 'Orientation']"]],
];
for (const [name,text,markers] of contracts) for (const marker of markers) if (!text.includes(marker)) failures.push(`${name} is missing ${marker}`);
if (failures.length) { console.error('Learning lab validation failed:'); failures.forEach((failure)=>console.error(`- ${failure}`)); process.exit(1); }
console.log(`Learning lab validation passed: ${declaredIds.length} visual IDs and ${recentLabs.length} recent labs checked.`);
