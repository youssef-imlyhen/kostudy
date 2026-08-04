import { useMemo, useState } from 'react';

export default function ExponentialGrowthLab() {
  const [start, setStart] = useState(10);
  const [rate, setRate] = useState(20);
  const [steps, setSteps] = useState(12);
  const [logScale, setLogScale] = useState(false);
  const values = useMemo(() => {
    const multiplier = 1 + rate / 100;
    const linearIncrement = start * rate / 100;
    return Array.from({ length: steps + 1 }, (_, index) => ({ step: index, exponential: start * multiplier ** index, linear: start + linearIncrement * index }));
  }, [start, rate, steps]);
  const transform = (value: number) => logScale ? Math.log10(Math.max(1, value)) : value;
  const transformedMaximum = Math.max(...values.flatMap((point) => [transform(point.exponential), transform(point.linear)]), 1);
  const x = (step: number) => 6 + (step / Math.max(1, steps)) * 88;
  const y = (value: number) => 92 - (transform(value) / transformedMaximum) * 78;
  const exponentialPoints = values.map((point) => `${x(point.step)},${y(point.exponential)}`).join(' ');
  const linearPoints = values.map((point) => `${x(point.step)},${y(point.linear)}`).join(' ');
  const final = values[values.length - 1];
  const doubling = rate > 0 ? Math.log(2) / Math.log(1 + rate / 100) : Infinity;

  return <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden">
    <div className="rounded-3xl bg-slate-950 p-4 sm:p-6"><svg viewBox="0 0 100 100" className="h-64 w-full" role="img" aria-label="Linear and exponential growth curves">{[25, 50, 75].map((value) => <line key={value} x1="6" x2="94" y1={92 - value * 0.78} y2={92 - value * 0.78} className="stroke-slate-800" strokeWidth="0.4" />)}<line x1="6" x2="94" y1="92" y2="92" className="stroke-slate-500" strokeWidth="0.7" /><line x1="6" x2="6" y1="14" y2="92" className="stroke-slate-500" strokeWidth="0.7" /><polyline points={linearPoints} fill="none" className="stroke-amber-300" strokeWidth="2" strokeLinecap="round" /><polyline points={exponentialPoints} fill="none" className="stroke-cyan-300" strokeWidth="2.4" strokeLinecap="round" /><text x="67" y="12" className="fill-cyan-300 text-[4px]">repeated multiplication</text><text x="67" y="18" className="fill-amber-300 text-[4px]">repeated addition</text><text x="76" y="98" className="fill-slate-500 text-[3px]">steps →</text></svg></div>
    <div className="lab-grid lab-grid-medium"><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Starting amount</span><span>{start}</span></span><input className="range range-primary range-sm" type="range" min="2" max="50" value={start} onChange={(event) => setStart(Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Growth each step</span><span>{rate}%</span></span><input className="range range-secondary range-sm" type="range" min="1" max="60" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Number of steps</span><span>{steps}</span></span><input className="range range-accent range-sm" type="range" min="3" max="24" value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label></div>
    <div className="lab-grid lab-grid-compact"><div className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">Linear final</div><div className="mt-1 text-xl font-black">{final.linear.toFixed(1)}</div></div><div className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">Exponential final</div><div className="mt-1 text-xl font-black">{final.exponential.toFixed(1)}</div></div><div className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">Gap</div><div className="mt-1 text-xl font-black">{(final.exponential - final.linear).toFixed(1)}</div></div><div className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">Approx. doubling</div><div className="mt-1 text-xl font-black">{Number.isFinite(doubling) ? `${doubling.toFixed(1)} steps` : 'Never'}</div></div></div>
    <div className="flex flex-wrap gap-2"><button type="button" className={`btn btn-sm ${logScale ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setLogScale((value) => !value)}>{logScale ? 'Log scale on' : 'Use log scale'}</button><button type="button" className="btn btn-outline btn-sm" onClick={() => { setStart(10); setRate(7); setSteps(20); }}>Slow compounding</button><button type="button" className="btn btn-outline btn-sm" onClick={() => { setStart(2); setRate(50); setSteps(12); }}>Fast doubling</button></div>
    <p className="text-xs leading-5 text-base-content/60">The linear comparison adds the first-step increase repeatedly. The exponential curve applies the same percentage to a changing base. Real growth can hit limits, change rates, or reverse.</p>
  </div>;
}
