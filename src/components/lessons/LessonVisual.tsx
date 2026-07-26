import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { LessonVisualId } from '../../types/lesson';

const ClickFunnelLab = lazy(() => import('./ClickFunnelLab'));
const RetentionCurveLab = lazy(() => import('./RetentionCurveLab'));
const SoundWaveLab = lazy(() => import('./SoundWaveLab'));
const MemoryCurveLab = lazy(() => import('./MemoryCurveLab'));

const visuals: Record<LessonVisualId, LazyExoticComponent<ComponentType>> = { 'click-funnel': ClickFunnelLab, 'retention-curve': RetentionCurveLab, 'sound-wave': SoundWaveLab, 'memory-curve': MemoryCurveLab };

export default function LessonVisual({ visual }: { visual: LessonVisualId }) {
  const Visual = visuals[visual];
  return <Suspense fallback={<div className="flex min-h-48 items-center justify-center rounded-2xl bg-base-200/60"><span className="loading loading-spinner loading-md" /></div>}><Visual /></Suspense>;
}
