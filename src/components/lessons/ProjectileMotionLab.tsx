import { useEffect, useMemo, useState } from 'react';

export default function ProjectileMotionLab() {
  const [speed, setSpeed] = useState(22);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);

  const model = useMemo(() => {
    const radians = angle * Math.PI / 180;
    const vx = speed * Math.cos(radians);
    const vy = speed * Math.sin(radians);
    const time = Math.max(0.01, (2 * vy) / gravity);
    const range = vx * time;
    const height = (vy * vy) / (2 * gravity);
    const points = Array.from({ length: 81 }, (_, index) => {
      const t = time * index / 80;
      return { x: vx * t, y: Math.max(0, vy * t - 0.5 * gravity * t * t) };
    });
    return { vx, vy, time, range, height, points };
  }, [angle, gravity, speed]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPhase((current) => {
      if (current >= 1) { setPlaying(false); return 1; }
      return Math.min(1, current + 0.015);
    }), 24);
    return () => window.clearInterval(timer);
  }, [playing]);

  const xScale = 88 / Math.max(1, model.range);
  const yScale = 47 / Math.max(1, model.height);
  const current = model.points[Math.min(80, Math.round(phase * 80))];
  const trajectory = model.points.map((point) => `${6 + point.x * xScale},${56 - point.y * yScale}`).join(' ');
  const reset = () => { setPlaying(false); setPhase(0); };

  return <div className="space-y-5">
    <div className="rounded-3xl bg-slate-950 p-4">
      <svg viewBox="0 0 100 64" className="h-64 w-full" role="img" aria-label="Animated projectile trajectory">
        {[16, 31, 46].map((y) => <line key={y} x1="5" x2="95" y1={y} y2={y} className="stroke-slate-800" strokeWidth=".35" />)}
        <line x1="5" x2="95" y1="56" y2="56" className="stroke-slate-500" />
        <polyline points={trajectory} fill="none" className="stroke-cyan-300" strokeWidth="1.6" strokeDasharray="2 1" />
        <line x1="6" x2={6 + model.vx * .8} y1="56" y2="56" className="stroke-amber-300" />
        <line x1="6" x2="6" y1="56" y2={56 - model.vy * .8} className="stroke-fuchsia-300" />
        <circle cx={6 + current.x * xScale} cy={56 - current.y * yScale} r="2.2" className="fill-white" />
        <text x="8" y="62" className="fill-slate-400 text-[3px]">horizontal motion continues</text>
        <text x="8" y="7" className="fill-slate-400 text-[3px]">gravity changes vertical velocity</text>
      </svg>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <Slider label="Launch speed" value={speed} suffix=" m/s" min={8} max={40} onChange={(value) => { setSpeed(value); reset(); }} />
      <Slider label="Angle" value={angle} suffix="°" min={10} max={80} onChange={(value) => { setAngle(value); reset(); }} />
      <Slider label="Gravity" value={gravity} suffix=" m/s²" min={2} max={20} step={0.2} onChange={(value) => { setGravity(value); reset(); }} />
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Metric label="Range" value={`${model.range.toFixed(1)} m`} />
      <Metric label="Air time" value={`${model.time.toFixed(2)} s`} />
      <Metric label="Maximum height" value={`${model.height.toFixed(1)} m`} />
      <Metric label="Velocity split" value={`${model.vx.toFixed(1)} / ${model.vy.toFixed(1)}`} />
    </div>
    <div className="flex gap-2"><button className="btn btn-primary btn-sm" onClick={() => { setPhase(0); setPlaying(true); }}>Launch</button><button className="btn btn-ghost btn-sm" onClick={reset}>Reset</button></div>
    <p className="text-xs leading-5 text-base-content/60">Teaching model: level ground, constant gravity, and no air resistance.</p>
  </div>;
}

function Slider({ label, value, suffix, min, max, step = 1, onChange }: { label: string; value: number; suffix: string; min: number; max: number; step?: number; onChange: (value: number) => void }) {
  return <label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>{label}</span><span>{value.toFixed(step < 1 ? 1 : 0)}{suffix}</span></span><input className="range range-primary range-sm" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">{label}</div><div className="mt-1 font-bold">{value}</div></div>; }
