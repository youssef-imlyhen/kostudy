import { useMemo, useState } from 'react';

type Shape = 'young' | 'balanced' | 'aging';

const startingShapes: Record<Shape, number[]> = {
  young: [20, 18, 16, 13, 11, 9, 7, 6],
  balanced: [12, 13, 13, 13, 13, 12, 12, 12],
  aging: [7, 8, 10, 12, 15, 17, 17, 14],
};

const labels = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70+'];

function project(start: number[], decades: number, birthsPerAdult: number, survival: number): number[] {
  let cohorts = [...start];
  for (let step = 0; step < decades; step += 1) {
    const reproductiveBase = cohorts[2] + cohorts[3];
    const births = reproductiveBase * birthsPerAdult * 0.22;
    const next = Array.from({ length: cohorts.length }, () => 0);
    next[0] = births;
    for (let index = 1; index < cohorts.length - 1; index += 1) {
      const agePenalty = Math.max(0.62, survival - index * 0.025);
      next[index] = cohorts[index - 1] * agePenalty;
    }
    next[next.length - 1] = cohorts[cohorts.length - 2] * Math.max(0.5, survival - 0.16)
      + cohorts[cohorts.length - 1] * Math.max(0.35, survival - 0.28);
    cohorts = next;
  }
  return cohorts;
}

export default function PopulationMomentumLab() {
  const [shape, setShape] = useState<Shape>('young');
  const [fertility, setFertility] = useState(2.1);
  const [survival, setSurvival] = useState(0.91);
  const [years, setYears] = useState(30);

  const result = useMemo(() => {
    const initial = startingShapes[shape];
    const projected = project(initial, years / 10, fertility, survival);
    const startTotal = initial.reduce((sum, value) => sum + value, 0);
    const total = projected.reduce((sum, value) => sum + value, 0);
    const youthShare = ((projected[0] + projected[1]) / Math.max(1, total)) * 100;
    const olderShare = ((projected[6] + projected[7]) / Math.max(1, total)) * 100;
    return { initial, projected, startTotal, total, youthShare, olderShare };
  }, [fertility, shape, survival, years]);

  const maxValue = Math.max(...result.initial, ...result.projected, 1);
  const change = ((result.total / result.startTotal) - 1) * 100;

  return <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden">
    <div className="lab-grid lab-grid-wide">
      <div className="rounded-3xl bg-base-200/70 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div><div className="text-sm font-bold">Age structure after {years} years</div><div className="text-xs text-base-content/50">Each bar is one ten-year cohort</div></div>
          <div className={`badge ${change >= 0 ? 'badge-success' : 'badge-warning'} badge-outline`}>{change >= 0 ? '+' : ''}{change.toFixed(0)}%</div>
        </div>
        <div className="flex h-56 items-end gap-2 rounded-2xl bg-base-100 p-3 sm:gap-3" role="img" aria-label={`Projected age structure after ${years} years. Cohort values: ${result.projected.map((value, index) => `${labels[index]} ${value.toFixed(1)}`).join(', ')}`}>
          {result.projected.map((value, index) => <div key={labels[index]} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <div className="text-[10px] font-semibold tabular-nums">{value.toFixed(1)}</div>
            <div className="w-full rounded-t-lg bg-primary/80 transition-all" style={{ height: `${Math.max(4, (value / maxValue) * 160)}px` }} />
            <div className="text-center text-[9px] leading-tight text-base-content/50">{labels[index]}</div>
          </div>)}
        </div>
      </div>
      <div className="lab-grid lab-grid-compact">
        {[['Projected size', result.total.toFixed(0)], ['Under 20', `${result.youthShare.toFixed(0)}%`], ['Age 60+', `${result.olderShare.toFixed(0)}%`], ['Starting size', result.startTotal.toFixed(0)]].map(([label, value]) => <div key={label} className="rounded-2xl border border-base-300 bg-base-100 p-4">
          <div className="text-xs text-base-content/55">{label}</div><div className="mt-1 text-2xl font-black">{value}</div>
        </div>)}
      </div>
    </div>

    <div className="lab-grid lab-grid-medium">
      <label className="space-y-2"><span className="text-sm font-semibold">Starting pyramid</span><select className="select select-bordered select-sm w-full" value={shape} onChange={(event) => setShape(event.target.value as Shape)}><option value="young">Young</option><option value="balanced">Balanced</option><option value="aging">Aging</option></select></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Birth intensity</span><span>{fertility.toFixed(1)}</span></span><input className="range range-primary range-sm" type="range" min="0.8" max="4.5" step="0.1" value={fertility} aria-valuetext={`${fertility.toFixed(1)} birth-intensity units`} onChange={(event) => setFertility(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Survival</span><span>{Math.round(survival * 100)}%</span></span><input className="range range-secondary range-sm" type="range" min="0.72" max="0.98" step="0.01" value={survival} aria-valuetext={`${Math.round(survival * 100)} percent survival`} onChange={(event) => setSurvival(Number(event.target.value))} /></label>
    </div>
    <label className="space-y-2"><span className="flex justify-between text-sm"><span>Projection horizon</span><span>{years} years</span></span><input className="range range-accent range-sm" type="range" min="0" max="70" step="10" value={years} aria-valuetext={`${years} years`} onChange={(event) => setYears(Number(event.target.value))} /></label>
    <p className="text-xs leading-5 text-base-content/55">Teaching model only: broad age bands, fixed rates, no migration, and simplified survival. Its purpose is to reveal cohort aging and population momentum—not forecast a real country.</p>
  </div>;
}
