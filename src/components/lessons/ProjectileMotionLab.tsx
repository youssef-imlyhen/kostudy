import { useEffect, useMemo, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export default function ProjectileMotionLab() {
  const [speed, setSpeed] = useState(22);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const radians = angle * Math.PI / 180;
  const vx = speed * Math.cos(radians);
  const vy = speed * Math.sin(radians);
  const flightTime = Math.max(0.01, (2 * vy) / gravity);
  const range = vx * flightTime;
  const maxHeight = (vy ** 2) / (2 * gravity);
  const trajectory = useMemo(() => Array.from({ length: 81 }, (_, index) => {
    const t = flightTime * index / 80;
    return { x: vx * t, y: vy * t - 0.5 * gravity * t * t };
  }), [flightTime, gravity, vx, vy]);
  const xScale = 88 / Math.max(1, range);
  const yScale = 46 / Math.max(1, maxHeight);
  const points = trajectory.map((point) => `${6 + point.x * xScale},${55 - point.y * yScale}`).join(' ');
  const current = trajectory[Math.min(80, Math.round(phase * 80))];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPhase((value) => {
      const next = value + 0.012;
      if (next >= 1) { setPlaying(false); return 1; }
      return next;
    }), 24);
    return () => window.clearInterval(timer);
  }, [playing]);
  useEffect(() => { if (prefersReducedMotion && playing) { setPlaying(false); setPhase(1); } }, [prefersReducedMotion, playing]);
  const reset = () => { setPlaying(false); setPhase(0); };
  const update = (setter: (value: number) => void, value: number) => { setter(value); reset(); };
  const launch = () => { setPhase(prefersReducedMotion ? 1 : 0); setPlaying(!prefersReducedMotion); };
  return <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden">
    <div className="overflow-hidden rounded-3xl bg-slate-950 p-3 sm:p-5"><svg viewBox="0 0 100 64" className="h-64 w-full" role="img" aria-label="Animated projectile trajectory">{[15,30,45].map((y)=><line key={y} x1="5" x2="95" y1={y} y2={y} className="stroke-slate-800" strokeWidth="0.35" />)}<line x1="5" x2="95" y1="55" y2="55" className="stroke-slate-500" /><polyline points={points} fill="none" className="stroke-cyan-300" strokeWidth="1.8" strokeDasharray="2 1" /><line x1="6" x2={6+vx*0.8} y1="55" y2="55" className="stroke-amber-300" /><line x1="6" x2="6" y1="55" y2={55-vy*0.8} className="stroke-fuchsia-300" /><circle cx={6+current.x*xScale} cy={55-current.y*yScale} r="2.2" className="fill-white" /><text x="8" y="61" className="fill-slate-400 text-[3px]">horizontal velocity continues</text><text x="8" y="7" className="fill-slate-400 text-[3px]">gravity changes vertical velocity</text></svg></div>
    <div className="lab-grid lab-grid-medium"><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Launch speed</span><span>{speed} m/s</span></span><input className="range range-primary range-sm" type="range" min="8" max="40" value={speed} onChange={(event)=>update(setSpeed,Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Angle</span><span>{angle}°</span></span><input className="range range-secondary range-sm" type="range" min="10" max="80" value={angle} onChange={(event)=>update(setAngle,Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm font-medium"><span>Gravity</span><span>{gravity.toFixed(1)} m/s²</span></span><input className="range range-accent range-sm" type="range" min="2" max="20" step="0.2" value={gravity} onChange={(event)=>update(setGravity,Number(event.target.value))} /></label></div>
    <div className="lab-grid lab-grid-compact">{[['Range',`${range.toFixed(1)} m`],['Air time',`${flightTime.toFixed(2)} s`],['Max height',`${maxHeight.toFixed(1)} m`],['vx / vy',`${vx.toFixed(1)} / ${vy.toFixed(1)}`]].map(([label,value])=><div key={label} className="rounded-2xl bg-base-200/70 p-3"><div className="text-xs text-base-content/55">{label}</div><div className="mt-1 font-bold">{value}</div></div>)}</div>
    <div className="flex gap-2"><button type="button" className="btn btn-primary btn-sm" onClick={launch}>{prefersReducedMotion?'Show landing':playing?'Restart throw':'Launch'}</button><button type="button" className="btn btn-ghost btn-sm" onClick={reset}>Reset</button></div><p className="text-xs leading-5 text-base-content/60">Ignores air resistance and assumes level ground. The purpose is to expose two independent motions inside one path.</p>
  </div>;
}
