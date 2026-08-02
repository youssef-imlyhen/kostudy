import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { LessonVisualId } from '../../types/lesson';

const ClickFunnelLab = lazy(() => import('./ClickFunnelLab'));
const RetentionCurveLab = lazy(() => import('./RetentionCurveLab'));
const SoundWaveLab = lazy(() => import('./SoundWaveLab'));
const MemoryCurveLab = lazy(() => import('./MemoryCurveLab'));
const ProjectileMotionLab = lazy(() => import('./ProjectileMotionLab'));
const EquilibriumLab = lazy(() => import('./EquilibriumLab'));
const SelectionLab = lazy(() => import('./SelectionLab'));
const BayesLab = lazy(() => import('./BayesLab'));
const SupplyDemandLab = lazy(() => import('./SupplyDemandLab'));
const SortingLab = lazy(() => import('./SortingLab'));
const PolyrhythmLab = lazy(() => import('./PolyrhythmLab'));
const EnergyBalanceLab = lazy(() => import('./EnergyBalanceLab'));

const visuals: Record<LessonVisualId, LazyExoticComponent<ComponentType>> = {
  'click-funnel': ClickFunnelLab,
  'retention-curve': RetentionCurveLab,
  'sound-wave': SoundWaveLab,
  'memory-curve': MemoryCurveLab,
  'projectile-motion': ProjectileMotionLab,
  'chemical-equilibrium': EquilibriumLab,
  'natural-selection': SelectionLab,
  'bayes-updater': BayesLab,
  'supply-demand': SupplyDemandLab,
  'sorting-algorithms': SortingLab,
  'polyrhythm': PolyrhythmLab,
  'energy-balance': EnergyBalanceLab,
};

export default function LessonVisual({ visual }: { visual: LessonVisualId }) {
  const Visual = visuals[visual];
  return <Suspense fallback={<div className="flex min-h-48 items-center justify-center rounded-2xl bg-base-200/60"><span className="loading loading-spinner loading-md" /></div>}><Visual /></Suspense>;
}
