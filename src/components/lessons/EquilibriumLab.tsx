import { useEffect, useMemo, useState } from 'react';

type Point = { a: number; b: number };

export default function EquilibriumLab() {
  const [forward, setForward] = useState(0.45);
  const [reverse, setReverse] = useState(0.25);
  const [initialA, setInitialA] = useState(0.9);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const series = useMemo<Point[]>(() => {
    const values: Point[] = [{ a: initialA, b: 1 - initialA }];
    for (let index = 1; index <= 120; index += 1) {
      const previous = values[index - 1];
      const a = Math.max(0, Math.min(1, previous.a + (reverse * previous.b - forward * previous.a) * 0.08));
      values.push({ a, b: 1 - a });
    }
    return values;
  }, [forward, initialA, reverse]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((current) => {
      if (current >= 120) { setPlaying(false); return 120; }
      return current + 1;
    }), 42);
    return () => window.clearInterval(timer);
  }, [playing]);

  const current = series[Math.min(step, 120)];
  const aPoints = series.map((point, index) => `${index / 1.2},${100 - point.a * 100}`).join(' ');
  const bPoints = series.map((point, index) => `${index / 1.2},${100 - point.b * 100}`).join(' ');
  const equilibriumA = reverse / (forward + reverse);
  const update = (setter: (value: number) => void, value: number) => { setter(value); setStep(0); setPlaying(false); };

  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
      <div className="rounded-3xl bg-slate-950 p-4"><svg viewBox="0 0 100 104" className="h-56 w-full" role="img" aria-label="A and B approach chemical equilibrium"><polyline points={aPoints} fill="none" className="stroke-cyan-300" strokeWidth="2" /><polyline points={bPoints} fill="none" className="stroke-fuchsia-300" strokeWidth="2" /><line x1={step / 1.2} x2={step / 1.2} y1="0" y2="100" className="stroke-white/50" strokeDasharray="2 2" /><text x="2" y="8" className="fill-cyan-300 text-[4px]">A</text><text x="9" y="8" className="fill-fuchsia-300 text-[4px]">B</text><text x="78" y="103" className="fill-slate-500 text-[3px]">time →</text></svg></div>
      <div className="rounded-3xl bg-base-200/70 p-4"><div className="grid grid-cols-5 gap-2">{Array.from({ length: 40 }, (_, index) => <div key={index} className={`aspect-square rounded-full ${index < Math.round(current.a * 40) ? 'bg-primary' : 'bg-secondary'}`} />)}</div><div className="mt-4 grid grid-cols-2 gap-2 text-center"><Metric label="A" value={`${Math.round(current.a * 100)}%`} /><Metric label="B" value={`${Math.round(current.b * 100)}%`} /></div></div>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <Slider label="A → B rate" value={forward} onChange={(value) => update(setForward, value)} />
      <Slider label="B → A rate" value={reverse} onChange={(value) => update(setReverse, value)} />
      <Slider label="Starting A" value={initialA} onChange={(value) => update(setInitialA, value)} />
    </div>
    <div className="grid gap-3 sm:grid-cols-3"><Metric label="Predicted equilibrium A" value={`${Math.round(equilibriumA * 100)}%`} /><Metric label="Forward flux now" value={(forward * current.a).toFixed(3)} /><Metric label="Reverse flux now" value={(reverse * current.b).toFixed(3)} /></div>
    <div className="flex gap-2"><button className="btn btn-primary btn-sm" onClick={() => { setStep(0); setPlaying(true); }}>Run reaction</button><button className="btn btn-ghost btn-sm" onClick={() => { setPlaying(false); setStep(0); }}>Reset</button></div>
    <p className="text-xs leading-5 text-base-content/60">Closed, mass-conserving A ⇌ B toy model. Equilibrium means equal opposing fluxes, not stopped molecular change.</p>
  </div>;
}
function Slider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>{label}</span><span>{value.toFixed(2)}</span></span><input className="range range-primary range-sm" type="range" min="0.05" max="0.95" step="0.05" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-base-100/80 p-3"><div className="text-xs text-base-content/55">{label}</div><div className="mt-1 text-xl font-black">{value}</div></div>; }
