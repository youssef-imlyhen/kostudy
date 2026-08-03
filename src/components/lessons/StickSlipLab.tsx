import { useMemo, useState } from 'react';

const deterministic = (index: number) => {
  const value = Math.sin(index * 41.71 + 9.13) * 43758.5453;
  return value - Math.floor(value);
};

export default function StickSlipLab() {
  const [loading, setLoading] = useState(7);
  const [threshold, setThreshold] = useState(65);
  const [heterogeneity, setHeterogeneity] = useState(18);
  const [recovery, setRecovery] = useState(28);
  const [time, setTime] = useState(70);

  const simulation = useMemo(() => {
    let stress = 8;
    const points: number[] = [];
    const events: Array<{ step: number; drop: number }> = [];
    for (let step = 0; step <= 100; step += 1) {
      stress += loading * 0.12;
      const localThreshold = threshold + (deterministic(step + 11) - 0.5) * heterogeneity;
      if (stress >= localThreshold) {
        const drop = Math.min(stress - 5, recovery + deterministic(step + 31) * recovery * 0.8);
        stress -= drop;
        events.push({ step, drop });
      }
      points.push(Math.max(0, stress));
    }
    return { points, events };
  }, [heterogeneity, loading, recovery, threshold]);

  const current = simulation.points[time];
  const maxStress = Math.max(...simulation.points, threshold + heterogeneity, 1);
  const path = simulation.points.map((value, index) => `${index === 0 ? 'M' : 'L'} ${index} ${92 - value / maxStress * 78}`).join(' ');
  const recentEvent = [...simulation.events].reverse().find((event) => event.step <= time);

  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl bg-base-200/70 p-4"><div className="mb-3"><div className="text-sm font-bold">Stored stress through time</div><div className="text-xs text-base-content/50">Gradual loading, sudden release</div></div><svg viewBox="0 0 100 100" className="h-64 w-full rounded-2xl bg-base-100" role="img" aria-label="Stick slip stress accumulation and release graph"><path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" /><line x1={time} x2={time} y1="8" y2="94" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" className="text-warning" /><line x1="0" x2="100" y1={92 - threshold / maxStress * 78} y2={92 - threshold / maxStress * 78} stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-error/50" /></svg></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Current stress</div><div className="mt-1 text-3xl font-black">{current.toFixed(1)}</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Release events</div><div className="mt-1 text-3xl font-black">{simulation.events.length}</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Latest drop before cursor</div><div className="mt-1 text-3xl font-black">{recentEvent ? recentEvent.drop.toFixed(1) : '—'}</div></div></div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Loading rate</span><span>{loading}</span></span><input className="range range-primary range-sm" type="range" min="2" max="14" value={loading} onChange={(event) => setLoading(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Failure threshold</span><span>{threshold}</span></span><input className="range range-error range-sm" type="range" min="35" max="90" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Fault heterogeneity</span><span>{heterogeneity}</span></span><input className="range range-warning range-sm" type="range" min="0" max="35" value={heterogeneity} onChange={(event) => setHeterogeneity(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Typical stress drop</span><span>{recovery}</span></span><input className="range range-secondary range-sm" type="range" min="8" max="55" value={recovery} onChange={(event) => setRecovery(Number(event.target.value))} /></label>
    </div>
    <label className="space-y-2"><span className="flex justify-between text-sm"><span>Time cursor</span><span>{time}</span></span><input className="range range-accent range-sm" type="range" min="0" max="100" value={time} onChange={(event) => setTime(Number(event.target.value))} /></label>
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm leading-6"><strong>Stick–slip means slow loading can produce abrupt motion.</strong> A threshold does not predict one exact failure time when local strength varies; it describes a mechanism and a range of possible release behavior.</div>
    <p className="text-xs leading-5 text-base-content/55">Conceptual spring-block model only. Real faults have geometry, fluids, multiple stress components, aftershocks, and interacting segments. This is not an earthquake forecast.</p>
  </div>;
}
