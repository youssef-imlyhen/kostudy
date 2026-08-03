import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
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
const ExponentialGrowthLab = lazy(() => import('./ExponentialGrowthLab'));
const CompoundGrowthLab = lazy(() => import('./CompoundGrowthLab'));
const OrbitLab = lazy(() => import('./OrbitLab'));
const PredatorPreyLab = lazy(() => import('./PredatorPreyLab'));
const TruthTableLab = lazy(() => import('./TruthTableLab'));
const PopulationMomentumLab = lazy(() => import('./PopulationMomentumLab'));
const SignalDetectionLab = lazy(() => import('./SignalDetectionLab'));
const MorphologyLab = lazy(() => import('./MorphologyLab'));
const ColorContextLab = lazy(() => import('./ColorContextLab'));
const RepeatedGameLab = lazy(() => import('./RepeatedGameLab'));
const EntropyCompressionLab = lazy(() => import('./EntropyCompressionLab'));
const NetworkDiffusionLab = lazy(() => import('./NetworkDiffusionLab'));
const StickSlipLab = lazy(() => import('./StickSlipLab'));
const GeometryTransformLab = lazy(() => import('./GeometryTransformLab'));
const CircuitLab = lazy(() => import('./CircuitLab'));

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
  'exponential-growth': ExponentialGrowthLab,
  'compound-growth': CompoundGrowthLab,
  'orbit-motion': OrbitLab,
  'predator-prey': PredatorPreyLab,
  'truth-table': TruthTableLab,
  'population-pyramid': PopulationMomentumLab,
  'signal-detection': SignalDetectionLab,
  'morphology-builder': MorphologyLab,
  'color-context': ColorContextLab,
  'repeated-game': RepeatedGameLab,
  'entropy-compression': EntropyCompressionLab,
  'network-diffusion': NetworkDiffusionLab,
  'stick-slip': StickSlipLab,
  'geometry-transform': GeometryTransformLab,
  'electric-circuit': CircuitLab,
};

interface LabNote {
  prediction: string;
  observation: string;
  updatedAt: number;
}

type LabNotes = Partial<Record<LessonVisualId, LabNote>>;

export default function LessonVisual({ visual }: { visual: LessonVisualId }) {
  const Visual = visuals[visual];
  const [notes, setNotes] = useLocalStorage<LabNotes>('lessonLabNotes', {});
  const note = notes[visual] || { prediction: '', observation: '', updatedAt: 0 };
  const update = (field: 'prediction' | 'observation', value: string) => {
    setNotes((current) => ({
      ...current,
      [visual]: { ...note, [field]: value, updatedAt: Date.now() },
    }));
  };
  const hasNote = Boolean(note.prediction.trim() || note.observation.trim());

  return <div className="space-y-4">
    <Suspense fallback={<div className="flex min-h-48 items-center justify-center rounded-2xl bg-base-200/60"><span className="loading loading-spinner loading-md" /></div>}><Visual /></Suspense>

    <details className="group rounded-2xl border border-base-300 bg-base-100" open={hasNote}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold">
        <span>Experiment notebook</span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${hasNote ? 'bg-success/10 text-success' : 'bg-base-200 text-base-content/45'}`}>{hasNote ? 'Saved locally' : 'Prediction → observation'}</span>
      </summary>
      <div className="grid gap-4 border-t border-base-300 p-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Before changing controls</span>
          <span className="block text-sm font-semibold">What do you predict?</span>
          <textarea className="textarea textarea-bordered min-h-24 w-full text-sm" value={note.prediction} onChange={(event) => update('prediction', event.target.value)} placeholder="When I change…, I expect… because…" />
        </label>
        <label className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">After experimenting</span>
          <span className="block text-sm font-semibold">What changed? What stayed invariant?</span>
          <textarea className="textarea textarea-bordered min-h-24 w-full text-sm" value={note.observation} onChange={(event) => update('observation', event.target.value)} placeholder="I observed… The surprising part was…" />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-base-content/45 sm:col-span-2">
          <span>Notes stay on this device and remain attached to this simulation.</span>
          {hasNote ? <button type="button" className="btn btn-ghost btn-xs" onClick={() => setNotes((current) => { const next = { ...current }; delete next[visual]; return next; })}>Clear notebook</button> : null}
        </div>
      </div>
    </details>
  </div>;
}
