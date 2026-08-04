import { useMemo, useState } from 'react';

type Topology = 'line' | 'star' | 'clustered';
interface Node { x: number; y: number }

const random = (seed: number) => {
  const value = Math.sin(seed * 18.731 + 4.17) * 43758.5453;
  return value - Math.floor(value);
};

function buildNetwork(topology: Topology): { nodes: Node[]; edges: Array<[number, number]> } {
  if (topology === 'line') {
    const nodes = Array.from({ length: 20 }, (_, index) => ({ x: 7 + index * 4.5, y: 50 + Math.sin(index * 1.7) * 12 }));
    return { nodes, edges: Array.from({ length: 19 }, (_, index) => [index, index + 1]) };
  }
  if (topology === 'star') {
    const nodes = [{ x: 50, y: 50 }, ...Array.from({ length: 19 }, (_, index) => { const angle = index / 19 * Math.PI * 2; return { x: 50 + Math.cos(angle) * 39, y: 50 + Math.sin(angle) * 39 }; })];
    return { nodes, edges: Array.from({ length: 19 }, (_, index) => [0, index + 1]) };
  }
  const nodes = Array.from({ length: 24 }, (_, index) => {
    const cluster = Math.floor(index / 8);
    const local = index % 8;
    const angle = local / 8 * Math.PI * 2;
    return { x: 20 + cluster * 30 + Math.cos(angle) * 12, y: 50 + Math.sin(angle) * 18 };
  });
  const edges: Array<[number, number]> = [];
  for (let cluster = 0; cluster < 3; cluster += 1) for (let local = 0; local < 8; local += 1) {
    const node = cluster * 8 + local;
    edges.push([node, cluster * 8 + ((local + 1) % 8)]);
    edges.push([node, cluster * 8 + ((local + 2) % 8)]);
  }
  edges.push([3, 8], [11, 16]);
  return { nodes, edges };
}

export default function NetworkDiffusionLab() {
  const [topology, setTopology] = useState<Topology>('clustered');
  const [transmission, setTransmission] = useState(45);
  const [steps, setSteps] = useState(5);
  const [seed, setSeed] = useState(0);

  const result = useMemo(() => {
    const network = buildNetwork(topology);
    const infectedAt = Array.from({ length: network.nodes.length }, () => -1);
    infectedAt[Math.min(seed, network.nodes.length - 1)] = 0;
    for (let step = 1; step <= steps; step += 1) {
      network.edges.forEach(([a, b], edgeIndex) => {
        const trySpread = (source: number, target: number, salt: number) => {
          if (infectedAt[source] >= 0 && infectedAt[source] < step && infectedAt[target] < 0 && random(edgeIndex * 97 + step * 37 + salt + seed * 13) < transmission / 100) infectedAt[target] = step;
        };
        trySpread(a, b, 11);
        trySpread(b, a, 53);
      });
    }
    const reached = infectedAt.filter((value) => value >= 0).length;
    const latest = Math.max(...infectedAt);
    const stepCounts = Array.from({ length: Math.max(1, latest + 1) }, (_, step) => infectedAt.filter((value) => value === step).length);
    return { ...network, infectedAt, reached, latest, stepCounts };
  }, [seed, steps, topology, transmission]);

  return <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden">
    <div className="min-w-0 space-y-4">
      <div className="min-w-0 max-w-full overflow-hidden rounded-3xl bg-base-200/70 p-3 sm:p-4">
        <div className="mx-auto w-full max-w-xl">
          <svg viewBox="0 0 100 100" className="aspect-square h-auto w-full max-w-full rounded-2xl bg-base-100" role="img" aria-labelledby="network-title network-description" preserveAspectRatio="xMidYMid meet">
          <title id="network-title">Network diffusion simulation</title>
          <desc id="network-description">Active nodes show the step when they first received the signal. The larger outlined node is the selected seed.</desc>
          {result.edges.map(([a, b], index) => <line key={`${a}-${b}-${index}`} x1={result.nodes[a].x} y1={result.nodes[a].y} x2={result.nodes[b].x} y2={result.nodes[b].y} stroke="currentColor" strokeWidth="0.7" className="text-base-content/20" />)}
          {result.nodes.map((node, index) => {
            const time = result.infectedAt[index];
            const active = time >= 0;
            const selected = index === seed;
            return <g key={index}>
              {selected ? <circle cx={node.x} cy={node.y} r="4.6" fill="none" stroke="currentColor" strokeWidth="1.1" className="text-accent" /> : null}
              <circle cx={node.x} cy={node.y} r={selected ? 3.5 : 3} className={active ? 'fill-primary' : 'fill-base-300'} />
              <text x={node.x} y={node.y + 1.45} textAnchor="middle" fontSize="4.2" fontWeight="700" className={active ? 'fill-primary-content' : 'fill-base-content'}>{active ? time : ''}</text>
            </g>;
          })}
          </svg>
        </div>
      </div>
      <div className="flex min-w-0 flex-wrap gap-3" role="status" aria-live="polite">
        <div className="min-w-0 flex-1 basis-40 rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Reached</div><div className="mt-1 text-3xl font-black">{result.reached}/{result.nodes.length}</div></div>
        <div className="min-w-0 flex-1 basis-40 rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Latest activation step</div><div className="mt-1 text-3xl font-black">{result.latest}</div></div>
        <div className="min-w-0 flex-1 basis-40 rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Edges</div><div className="mt-1 text-3xl font-black">{result.edges.length}</div></div>
      </div>
    </div>
    <div className="flex min-w-0 flex-wrap gap-2" aria-label="Activation count by step">
      {result.stepCounts.map((count, step) => <span key={step} className="badge badge-outline h-auto min-h-7 gap-1 whitespace-normal py-1.5"><span className="font-bold">Step {step}</span><span>{count} node{count === 1 ? '' : 's'}</span></span>)}
      {result.reached < result.nodes.length ? <span className="badge badge-ghost h-auto min-h-7 whitespace-normal py-1.5">Not reached: {result.nodes.length - result.reached}</span> : null}
    </div>
    <div className="flex min-w-0 flex-wrap gap-4">
      <label className="min-w-[12rem] flex-1 space-y-2"><span className="text-sm font-semibold">Topology</span><select className="select select-bordered select-sm w-full min-w-0" value={topology} onChange={(event) => { setTopology(event.target.value as Topology); setSeed(0); }}><option value="line">Line</option><option value="star">Hub and spokes</option><option value="clustered">Three clusters</option></select></label>
      <label className="min-w-[12rem] flex-1 space-y-2"><span className="flex justify-between gap-3 text-sm"><span>Transmission</span><span>{transmission}%</span></span><input className="range range-primary range-sm w-full" type="range" min="5" max="100" value={transmission} aria-valuetext={`${transmission}% transmission chance`} onChange={(event) => setTransmission(Number(event.target.value))} /></label>
      <label className="min-w-[12rem] flex-1 space-y-2"><span className="flex justify-between gap-3 text-sm"><span>Steps</span><span>{steps}</span></span><input className="range range-secondary range-sm w-full" type="range" min="0" max="12" value={steps} aria-valuetext={`${steps} diffusion steps`} onChange={(event) => setSteps(Number(event.target.value))} /></label>
      <label className="min-w-[12rem] flex-1 space-y-2"><span className="flex justify-between gap-3 text-sm"><span>Seed node</span><span>{seed}</span></span><input className="range range-accent range-sm w-full" type="range" min="0" max={result.nodes.length - 1} value={seed} aria-valuetext={`Node ${seed}`} onChange={(event) => setSeed(Number(event.target.value))} /></label>
    </div>
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm leading-6"><strong>Read each active node number as its first activation step.</strong> The step badges provide the same information without relying on tiny labels or color alone. A hub can spread quickly but also creates dependence on one node; clusters spread internally while narrow bridges slow movement between groups.</div>
    <p className="text-xs leading-5 text-base-content/55">Toy independent-cascade model with deterministic pseudo-random trials. Real information, disease, behavior, and innovation spread through different mechanisms and changing networks.</p>
  </div>;
}
