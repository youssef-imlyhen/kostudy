import { useMemo, useState } from 'react';

const symbols = ['A', 'B', 'C', 'D'];
const deterministic = (index: number) => {
  const value = Math.sin(index * 91.731 + 17.19) * 43758.5453;
  return value - Math.floor(value);
};

export default function EntropyCompressionLab() {
  const [weights, setWeights] = useState([55, 25, 15, 5]);
  const [sampleSize, setSampleSize] = useState(40);

  const result = useMemo(() => {
    const total = Math.max(1, weights.reduce((sum, value) => sum + value, 0));
    const probabilities = weights.map((value) => value / total);
    const entropy = probabilities.reduce((sum, probability) => probability > 0 ? sum - probability * Math.log2(probability) : sum, 0);
    const fixedBitsPerSymbol = Math.ceil(Math.log2(symbols.length));
    const cumulative = probabilities.reduce<number[]>((list, probability) => [...list, (list.at(-1) || 0) + probability], []);
    const sample = Array.from({ length: sampleSize }, (_, index) => {
      const value = deterministic(index + sampleSize * 7);
      return symbols[cumulative.findIndex((limit) => value <= limit)];
    });
    const counts = symbols.map((symbol) => sample.filter((item) => item === symbol).length);
    return {
      probabilities,
      entropy,
      fixedBits: fixedBitsPerSymbol * sampleSize,
      idealBits: entropy * sampleSize,
      sample,
      counts,
    };
  }, [sampleSize, weights]);

  const updateWeight = (index: number, value: number) => setWeights((current) => current.map((weight, position) => position === index ? value : weight));
  const preset = (next: number[]) => setWeights(next);

  return <div className="space-y-5">
    <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl bg-base-200/70 p-4 sm:p-5">
        <div className="mb-4"><div className="text-sm font-bold">Symbol probability</div><div className="text-xs text-base-content/50">More predictable sources carry less average surprise</div></div>
        <div className="flex h-52 items-end gap-4 rounded-2xl bg-base-100 p-4">
          {symbols.map((symbol, index) => <div key={symbol} className="flex flex-1 flex-col items-center justify-end gap-2">
            <div className="text-xs font-bold tabular-nums">{(result.probabilities[index] * 100).toFixed(0)}%</div>
            <div className="w-full rounded-t-xl bg-primary/80 transition-all" style={{ height: `${Math.max(5, result.probabilities[index] * 150)}px` }} />
            <div className="text-lg font-black">{symbol}</div>
          </div>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Entropy</div><div className="mt-1 text-3xl font-black">{result.entropy.toFixed(2)}</div><div className="text-xs text-base-content/50">bits per symbol</div></div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Fixed-length encoding</div><div className="mt-1 text-2xl font-black">{result.fixedBits} bits</div></div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Shannon lower bound</div><div className="mt-1 text-2xl font-black">{result.idealBits.toFixed(1)} bits</div></div>
      </div>
    </div>

    <div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Deterministic sample</div><div className="break-all font-mono text-sm leading-6">{result.sample.join('')}</div><div className="mt-3 flex flex-wrap gap-2">{symbols.map((symbol, index) => <span key={symbol} className="badge badge-outline">{symbol}: {result.counts[index]}</span>)}</div></div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{symbols.map((symbol, index) => <label key={symbol} className="space-y-2"><span className="flex justify-between text-sm"><span>Weight {symbol}</span><span>{weights[index]}</span></span><input className="range range-primary range-sm" type="range" min="0" max="100" value={weights[index]} onChange={(event) => updateWeight(index, Number(event.target.value))} /></label>)}</div>
    <label className="space-y-2"><span className="flex justify-between text-sm"><span>Sample length</span><span>{sampleSize}</span></span><input className="range range-secondary range-sm" type="range" min="12" max="100" value={sampleSize} onChange={(event) => setSampleSize(Number(event.target.value))} /></label>
    <div className="flex flex-wrap gap-2"><button className="btn btn-ghost btn-sm" onClick={() => preset([25, 25, 25, 25])}>Uniform</button><button className="btn btn-ghost btn-sm" onClick={() => preset([70, 20, 8, 2])}>Highly predictable</button><button className="btn btn-ghost btn-sm" onClick={() => preset([48, 48, 2, 2])}>Two common symbols</button></div>
    <p className="text-xs leading-5 text-base-content/55">Entropy is an average uncertainty measure, not the size of this particular sample. The lower bound is theoretical; a real prefix code also needs whole codewords, a codebook, and assumptions about independence.</p>
  </div>;
}
