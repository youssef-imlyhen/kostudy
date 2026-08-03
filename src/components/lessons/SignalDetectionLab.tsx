import { useMemo, useState } from 'react';

function erf(value: number): number {
  const sign = value < 0 ? -1 : 1;
  const x = Math.abs(value);
  const t = 1 / (1 + 0.3275911 * x);
  const estimate = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return sign * estimate;
}

const normalCdf = (value: number) => 0.5 * (1 + erf(value / Math.sqrt(2)));
const density = (x: number, mean: number) => Math.exp(-0.5 * (x - mean) ** 2);

export default function SignalDetectionLab() {
  const [separation, setSeparation] = useState(1.5);
  const [criterion, setCriterion] = useState(1.1);
  const [prevalence, setPrevalence] = useState(20);

  const metrics = useMemo(() => {
    const hitRate = 1 - normalCdf(criterion - separation);
    const falseAlarmRate = 1 - normalCdf(criterion);
    const prior = prevalence / 100;
    const truePositive = prior * hitRate;
    const falsePositive = (1 - prior) * falseAlarmRate;
    const positiveValue = truePositive / Math.max(0.0001, truePositive + falsePositive);
    return { hitRate, falseAlarmRate, missRate: 1 - hitRate, positiveValue };
  }, [criterion, prevalence, separation]);

  const points = Array.from({ length: 81 }, (_, index) => -4 + index * 0.1);
  const pathFor = (mean: number) => points.map((x, index) => {
    const px = ((x + 4) / 8) * 100;
    const py = 92 - density(x, mean) * 74;
    return `${index === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`;
  }).join(' ');
  const criterionX = ((criterion + 4) / 8) * 100;

  return <div className="space-y-5">
    <div className="rounded-3xl bg-base-200/70 p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><div className="text-sm font-bold">Noise and signal overlap</div><div className="text-xs text-base-content/50">The vertical line is the current response criterion</div></div><div className="flex gap-3 text-xs"><span className="font-semibold text-primary">Noise</span><span className="font-semibold text-secondary">Signal</span></div></div>
      <svg viewBox="0 0 100 100" className="h-56 w-full overflow-visible rounded-2xl bg-base-100" role="img" aria-label="Overlapping noise and signal distributions with a movable decision criterion">
        <path d={pathFor(0)} fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary" />
        <path d={pathFor(separation)} fill="none" stroke="currentColor" strokeWidth="1.6" className="text-secondary" />
        <line x1={criterionX} x2={criterionX} y1="8" y2="94" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" className="text-warning" />
        <text x={Math.min(88, criterionX + 2)} y="13" fontSize="4" className="fill-warning">criterion</text>
        <line x1="4" x2="96" y1="92" y2="92" stroke="currentColor" strokeWidth="0.5" className="text-base-content/30" />
      </svg>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[['Hit rate', metrics.hitRate], ['False alarms', metrics.falseAlarmRate], ['Miss rate', metrics.missRate], ['Among positives', metrics.positiveValue]].map(([label, raw]) => <div key={String(label)} className="rounded-2xl border border-base-300 bg-base-100 p-3 text-center"><div className="text-xs text-base-content/55">{label}</div><div className="mt-1 text-xl font-black">{(Number(raw) * 100).toFixed(0)}%</div></div>)}
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Signal separation</span><span>{separation.toFixed(1)}</span></span><input className="range range-secondary range-sm" type="range" min="0.2" max="3.5" step="0.1" value={separation} onChange={(event) => setSeparation(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Response criterion</span><span>{criterion.toFixed(1)}</span></span><input className="range range-warning range-sm" type="range" min="-1" max="4" step="0.1" value={criterion} onChange={(event) => setCriterion(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Signal prevalence</span><span>{prevalence}%</span></span><input className="range range-primary range-sm" type="range" min="1" max="70" value={prevalence} onChange={(event) => setPrevalence(Number(event.target.value))} /></label>
    </div>
    <p className="text-xs leading-5 text-base-content/55">Lowering the criterion catches more signals and also creates more false alarms. Separation measures sensitivity; criterion reflects response bias. This toy model uses equal-width normal distributions.</p>
  </div>;
}
