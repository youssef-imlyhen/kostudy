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
        trySpread(a, b, 11); trySpread(b, a, 53);
      });
    }
    const reached = infectedAt.filter((value) => value >= 0).length;
    const latest = Math.max(...infectedAt);
    return { ...network, infectedAt, reached, latest };
  }, [seed, steps, topology, transmission]);

  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl bg-base-200/70 p-4"><svg viewBox="0 0 100 100" className="h-72 w-full rounded-2xl bg-base-100" role="img" aria-label="Network diffusion simulation">
        {result.edges.map(([a, b], index) => <line key={`${a}-${b}-${index}`} x1={result.nodes[a].x} y1={result.nodes[a].y} x2={result.nodes[b].x} y2={result.nodes[b].y} stroke="currentColor" strokeWidth="0.7" className="text-base-content/20" />)}
        {result.nodes.map((node, index) => { const time = result.infectedAt[index]; const active = time >= 0; return <g key={index}><circle cx={node.x} cy={node.y} r={index === seed ? 3.5 : 2.8} className={active ? 'fill-primary' : 'fill-base-300'} /><text x={node.x} y={node.y + 1.2} textAnchor="middle" fontSize="3" className={active ? 'fill-primary-content' : 'fill-base-content'}>{active ? time : ''}</text></g>; })}
      </svg></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1"><div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Reached</div><div className="mt-1 text-3xl font-black">{result.reached}/{result.nodes.length}</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Latest activation step</div><div className="mt-1 text-3xl font-black">{result.latest}</div></div><div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Edges</div><div className="mt-1 text-3xl font-black">{result.edges.length}</div></div></div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-2"><span className="text-sm font-semibold">Topology</span><select className="select select-bordered select-sm w-full" value={topology} onChange={(event) => { setTopology(event.target.value as Topology); setSeed(0); }}><option value="line">Line</option><option value="star">Hub and spokes</option><option value="clustered">Three clusters</option></select></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Transmission</span><span>{transmission}%</span></span><input className="range range-primary range-sm" type="range" min="5" max="100" value={transmission} onChange={(event) => setTransmission(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Steps</span><span>{steps}</span></span><input className="range range-secondary range-sm" type="range" min="0" max="12" value={steps} onChange={(event) => setSteps(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Seed node</span><span>{seed}</span></span><input className="range range-accent range-sm" type="range" min="0" max={result.nodes.length - 1} value={seed} onChange={(event) => setSeed(Number(event.target.value))} /></label>
    </div>
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm leading-6"><strong>Read the numbers inside active nodes as first activation time.</strong> A hub can spread quickly but also creates dependence on one node; clusters spread internally while narrow bridges slow movement between groups.</div>
    <p className="text-xs leading-5 text-base-content/55">Toy independent-cascade model with deterministic pseudo-random trials. Real information, disease, behavior, and innovation spread through different mechanisms and changing networks.</p>
  </div>;
}
