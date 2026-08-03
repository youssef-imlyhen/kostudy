import { useMemo, useState } from 'react';

type Strategy = 'cooperate' | 'defect' | 'tit-for-tat' | 'forgiving' | 'random';
type Action = 'C' | 'D';

const labels: Record<Strategy, string> = {
  cooperate: 'Always cooperate',
  defect: 'Always defect',
  'tit-for-tat': 'Tit for tat',
  forgiving: 'Forgiving reciprocity',
  random: 'Random 50/50',
};

const deterministicRandom = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function intendedAction(strategy: Strategy, round: number, opponentHistory: Action[]): Action {
  if (strategy === 'cooperate') return 'C';
  if (strategy === 'defect') return 'D';
  if (strategy === 'random') return deterministicRandom(round + 91) > 0.5 ? 'C' : 'D';
  if (round === 0) return 'C';
  if (strategy === 'tit-for-tat') return opponentHistory[round - 1];
  const last = opponentHistory[round - 1];
  const before = opponentHistory[round - 2];
  return last === 'D' && before === 'D' ? 'D' : 'C';
}

export default function RepeatedGameLab() {
  const [strategyA, setStrategyA] = useState<Strategy>('tit-for-tat');
  const [strategyB, setStrategyB] = useState<Strategy>('defect');
  const [rounds, setRounds] = useState(24);
  const [noise, setNoise] = useState(4);
  const [temptation, setTemptation] = useState(5);

  const game = useMemo(() => {
    const historyA: Action[] = [];
    const historyB: Action[] = [];
    const rows: Array<{ a: Action; b: Action; payoffA: number; payoffB: number }> = [];
    let totalA = 0;
    let totalB = 0;

    for (let round = 0; round < rounds; round += 1) {
      let actionA = intendedAction(strategyA, round, historyB);
      let actionB = intendedAction(strategyB, round, historyA);
      if (deterministicRandom(round + 301) < noise / 100) actionA = actionA === 'C' ? 'D' : 'C';
      if (deterministicRandom(round + 701) < noise / 100) actionB = actionB === 'C' ? 'D' : 'C';
      historyA.push(actionA);
      historyB.push(actionB);

      let payoffA = 0;
      let payoffB = 0;
      if (actionA === 'C' && actionB === 'C') { payoffA = 3; payoffB = 3; }
      if (actionA === 'D' && actionB === 'C') { payoffA = temptation; payoffB = 0; }
      if (actionA === 'C' && actionB === 'D') { payoffA = 0; payoffB = temptation; }
      if (actionA === 'D' && actionB === 'D') { payoffA = 1; payoffB = 1; }
      totalA += payoffA;
      totalB += payoffB;
      rows.push({ a: actionA, b: actionB, payoffA, payoffB });
    }
    const mutualCooperation = rows.filter((row) => row.a === 'C' && row.b === 'C').length;
    return { rows, totalA, totalB, mutualCooperation };
  }, [noise, rounds, strategyA, strategyB, temptation]);

  const strategyOptions = (Object.keys(labels) as Strategy[]).map((strategy) => <option key={strategy} value={strategy}>{labels[strategy]}</option>);

  return <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5"><div className="text-xs font-bold uppercase tracking-wider text-primary">Player A</div><div className="mt-1 text-lg font-black">{labels[strategyA]}</div><div className="mt-3 text-4xl font-black">{game.totalA}</div><div className="text-xs text-base-content/50">total payoff</div></div>
      <div className="rounded-3xl border border-secondary/20 bg-secondary/5 p-5"><div className="text-xs font-bold uppercase tracking-wider text-secondary">Player B</div><div className="mt-1 text-lg font-black">{labels[strategyB]}</div><div className="mt-3 text-4xl font-black">{game.totalB}</div><div className="text-xs text-base-content/50">total payoff</div></div>
    </div>

    <div className="overflow-x-auto rounded-3xl bg-base-200/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-3"><div><div className="text-sm font-bold">Round history</div><div className="text-xs text-base-content/50">C = cooperate · D = defect</div></div><div className="badge badge-outline">{game.mutualCooperation}/{rounds} mutual C</div></div>
      <div className="min-w-[540px] space-y-2">
        <div className="flex items-center gap-1"><span className="w-14 text-xs font-bold text-primary">A</span>{game.rows.map((row, index) => <div key={`a-${index}`} title={`Round ${index + 1}: +${row.payoffA}`} className={`flex h-7 min-w-5 flex-1 items-center justify-center rounded text-[10px] font-black ${row.a === 'C' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>{row.a}</div>)}</div>
        <div className="flex items-center gap-1"><span className="w-14 text-xs font-bold text-secondary">B</span>{game.rows.map((row, index) => <div key={`b-${index}`} title={`Round ${index + 1}: +${row.payoffB}`} className={`flex h-7 min-w-5 flex-1 items-center justify-center rounded text-[10px] font-black ${row.b === 'C' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>{row.b}</div>)}</div>
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="space-y-2"><span className="text-sm font-semibold">Player A strategy</span><select className="select select-bordered select-sm w-full" value={strategyA} onChange={(event) => setStrategyA(event.target.value as Strategy)}>{strategyOptions}</select></label>
      <label className="space-y-2"><span className="text-sm font-semibold">Player B strategy</span><select className="select select-bordered select-sm w-full" value={strategyB} onChange={(event) => setStrategyB(event.target.value as Strategy)}>{strategyOptions}</select></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Rounds</span><span>{rounds}</span></span><input className="range range-primary range-sm" type="range" min="4" max="40" value={rounds} onChange={(event) => setRounds(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Action error</span><span>{noise}%</span></span><input className="range range-warning range-sm" type="range" min="0" max="25" value={noise} onChange={(event) => setNoise(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Temptation payoff</span><span>{temptation}</span></span><input className="range range-secondary range-sm" type="range" min="4" max="8" value={temptation} onChange={(event) => setTemptation(Number(event.target.value))} /></label>
    </div>

    <div className="grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4"><div className="rounded-xl bg-success/10 p-2">C/C → 3, 3</div><div className="rounded-xl bg-warning/10 p-2">D/C → {temptation}, 0</div><div className="rounded-xl bg-warning/10 p-2">C/D → 0, {temptation}</div><div className="rounded-xl bg-error/10 p-2">D/D → 1, 1</div></div>
    <p className="text-xs leading-5 text-base-content/55">Toy repeated dilemma: fixed payoffs, deterministic pseudo-noise, no communication, reputation, institutions, power, or changing needs. It demonstrates strategic dependence—not a universal theory of human morality.</p>
  </div>;
}
