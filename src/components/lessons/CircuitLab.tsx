import { useMemo, useState } from 'react';

type Arrangement = 'series' | 'parallel';

export default function CircuitLab() {
  const [arrangement, setArrangement] = useState<Arrangement>('series');
  const [voltage, setVoltage] = useState(12);
  const [r1, setR1] = useState(8);
  const [r2, setR2] = useState(16);

  const result = useMemo(() => {
    const equivalent = arrangement === 'series' ? r1 + r2 : 1 / (1 / r1 + 1 / r2);
    const totalCurrent = voltage / equivalent;
    const branch1 = arrangement === 'series' ? totalCurrent : voltage / r1;
    const branch2 = arrangement === 'series' ? totalCurrent : voltage / r2;
    const v1 = arrangement === 'series' ? branch1 * r1 : voltage;
    const v2 = arrangement === 'series' ? branch2 * r2 : voltage;
    return { equivalent, totalCurrent, branch1, branch2, v1, v2, power: voltage * totalCurrent };
  }, [arrangement, r1, r2, voltage]);

  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl bg-base-200/70 p-4"><svg viewBox="0 0 120 70" className="h-64 w-full rounded-2xl bg-base-100" role="img" aria-label={`${arrangement} electric circuit`}>
        <line x1="15" y1="15" x2="105" y2="15" stroke="currentColor" strokeWidth="2" className="text-base-content/50" /><line x1="15" y1="55" x2="105" y2="55" stroke="currentColor" strokeWidth="2" className="text-base-content/50" /><line x1="15" y1="15" x2="15" y2="55" stroke="currentColor" strokeWidth="2" className="text-base-content/50" /><line x1="105" y1="15" x2="105" y2="55" stroke="currentColor" strokeWidth="2" className="text-base-content/50" />
        <line x1="10" y1="29" x2="20" y2="29" stroke="currentColor" strokeWidth="3" className="text-primary" /><line x1="7" y1="39" x2="23" y2="39" stroke="currentColor" strokeWidth="1.5" className="text-primary" /><text x="3" y="50" fontSize="4" className="fill-primary">{voltage} V</text>
        {arrangement === 'series' ? <><rect x="39" y="9" width="18" height="12" rx="2" className="fill-warning/25 stroke-warning" /><rect x="69" y="9" width="18" height="12" rx="2" className="fill-secondary/25 stroke-secondary" /><text x="43" y="17" fontSize="4">R1</text><text x="73" y="17" fontSize="4">R2</text></> : <><line x1="38" y1="15" x2="38" y2="55" stroke="currentColor" strokeWidth="1.5" /><line x1="82" y1="15" x2="82" y2="55" stroke="currentColor" strokeWidth="1.5" /><rect x="51" y="22" width="18" height="10" rx="2" className="fill-warning/25 stroke-warning" /><rect x="51" y="39" width="18" height="10" rx="2" className="fill-secondary/25 stroke-secondary" /><line x1="38" y1="27" x2="51" y2="27" stroke="currentColor" /><line x1="69" y1="27" x2="82" y2="27" stroke="currentColor" /><line x1="38" y1="44" x2="51" y2="44" stroke="currentColor" /><line x1="69" y1="44" x2="82" y2="44" stroke="currentColor" /><text x="56" y="29" fontSize="4">R1</text><text x="56" y="46" fontSize="4">R2</text></>}
      </svg></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Equivalent resistance</div><div className="mt-1 text-3xl font-black">{result.equivalent.toFixed(2)} Ω</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Total current</div><div className="mt-1 text-3xl font-black">{result.totalCurrent.toFixed(2)} A</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Total power</div><div className="mt-1 text-3xl font-black">{result.power.toFixed(1)} W</div></div></div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><label className="space-y-2"><span className="text-sm font-semibold">Arrangement</span><select className="select select-bordered select-sm w-full" value={arrangement} onChange={(event) => setArrangement(event.target.value as Arrangement)}><option value="series">Series</option><option value="parallel">Parallel</option></select></label><label className="space-y-2"><span className="flex justify-between text-sm"><span>Source voltage</span><span>{voltage} V</span></span><input className="range range-primary range-sm" type="range" min="1" max="24" value={voltage} onChange={(event) => setVoltage(Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm"><span>R1</span><span>{r1} Ω</span></span><input className="range range-warning range-sm" type="range" min="2" max="40" value={r1} onChange={(event) => setR1(Number(event.target.value))} /></label><label className="space-y-2"><span className="flex justify-between text-sm"><span>R2</span><span>{r2} Ω</span></span><input className="range range-secondary range-sm" type="range" min="2" max="40" value={r2} onChange={(event) => setR2(Number(event.target.value))} /></label></div>
    <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-warning/20 bg-warning/5 p-4"><div className="text-sm font-bold">R1 branch</div><div className="mt-2 text-sm">Current {result.branch1.toFixed(2)} A · Voltage {result.v1.toFixed(2)} V</div></div><div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4"><div className="text-sm font-bold">R2 branch</div><div className="mt-2 text-sm">Current {result.branch2.toFixed(2)} A · Voltage {result.v2.toFixed(2)} V</div></div></div>
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm leading-6">{arrangement === 'series' ? <><strong>Series invariant:</strong> the same current passes through both resistors, while voltage drops divide.</> : <><strong>Parallel invariant:</strong> each branch has the same voltage, while currents divide and recombine.</>}</div>
    <p className="text-xs leading-5 text-base-content/55">Ideal DC model using Ohm’s law. Real sources and components have limits, temperature effects, internal resistance, tolerances, and safety constraints. Never use this toy model to choose mains-voltage wiring.</p>
  </div>;
}
