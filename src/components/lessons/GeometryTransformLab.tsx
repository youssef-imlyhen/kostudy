import { useMemo, useState } from 'react';

type Transform = 'translate' | 'rotate' | 'reflect' | 'scale';
type Point = [number, number];
const original: Point[] = [[22, 25], [42, 20], [48, 42], [30, 50], [17, 40]];

const polygon = (points: Point[]) => points.map(([x, y]) => `${x},${y}`).join(' ');
const area = (points: Point[]) => Math.abs(points.reduce((sum, [x1, y1], index) => {
  const [x2, y2] = points[(index + 1) % points.length];
  return sum + x1 * y2 - x2 * y1;
}, 0)) / 2;

export default function GeometryTransformLab() {
  const [transform, setTransform] = useState<Transform>('rotate');
  const [angle, setAngle] = useState(45);
  const [scale, setScale] = useState(1.35);
  const [dx, setDx] = useState(28);
  const [dy, setDy] = useState(12);

  const result = useMemo(() => {
    const center: Point = [32, 34];
    const radians = angle * Math.PI / 180;
    const transformed = original.map(([x, y]): Point => {
      if (transform === 'translate') return [x + dx, y + dy];
      if (transform === 'reflect') return [100 - x, y];
      const localX = x - center[0];
      const localY = y - center[1];
      if (transform === 'scale') return [68 + localX * scale, 34 + localY * scale];
      return [
        68 + localX * Math.cos(radians) - localY * Math.sin(radians),
        34 + localX * Math.sin(radians) + localY * Math.cos(radians),
      ];
    });
    const originalArea = area(original);
    const transformedArea = area(transformed);
    return {
      transformed,
      originalArea,
      transformedArea,
      areaRatio: transformedArea / originalArea,
    };
  }, [angle, dx, dy, scale, transform]);

  const invariants = transform === 'scale'
    ? ['Angles', 'Parallel lines', 'Shape similarity']
    : transform === 'reflect'
      ? ['Lengths', 'Angles', 'Area']
      : ['Lengths', 'Angles', 'Area', 'Orientation'];

  return <div className="space-y-5">
    <div className="rounded-3xl bg-base-200/70 p-4">
      <svg viewBox="0 0 100 70" className="h-72 w-full rounded-2xl bg-base-100" role="img" aria-label="Original and transformed polygons">
        <defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.25" className="text-base-content/10" /></pattern></defs>
        <rect width="100" height="70" fill="url(#grid)" />
        <polygon points={polygon(original)} className="fill-primary/20 stroke-primary" strokeWidth="1.2" />
        <polygon points={polygon(result.transformed)} className="fill-secondary/25 stroke-secondary" strokeWidth="1.2" />
        <text x="18" y="62" fontSize="4" className="fill-primary">original</text>
        <text x="68" y="62" fontSize="4" className="fill-secondary">image</text>
      </svg>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-2">
        <span className="text-sm font-semibold">Transformation</span>
        <select className="select select-bordered select-sm w-full" value={transform} onChange={(event) => setTransform(event.target.value as Transform)}>
          <option value="translate">Translation</option><option value="rotate">Rotation</option><option value="reflect">Reflection</option><option value="scale">Dilation</option>
        </select>
      </label>
      <label className="space-y-2">
        <span className="flex justify-between text-sm"><span>Angle</span><span>{angle}°</span></span>
        <input className="range range-primary range-sm" type="range" min="-180" max="180" value={angle} disabled={transform !== 'rotate'} onChange={(event) => setAngle(Number(event.target.value))} />
      </label>
      <label className="space-y-2">
        <span className="flex justify-between text-sm"><span>Scale factor</span><span>{scale.toFixed(2)}</span></span>
        <input className="range range-secondary range-sm" type="range" min="0.4" max="2" step="0.05" value={scale} disabled={transform !== 'scale'} onChange={(event) => setScale(Number(event.target.value))} />
      </label>
      <fieldset className="space-y-2">
        <legend className="flex w-full justify-between text-sm"><span>Translation</span><span>{dx}, {dy}</span></legend>
        <div className="grid grid-cols-2 gap-2">
          <input aria-label="Horizontal translation" className="range range-sm" type="range" min="0" max="45" value={dx} disabled={transform !== 'translate'} onChange={(event) => setDx(Number(event.target.value))} />
          <input aria-label="Vertical translation" className="range range-sm" type="range" min="-20" max="25" value={dy} disabled={transform !== 'translate'} onChange={(event) => setDy(Number(event.target.value))} />
        </div>
      </fieldset>
    </div>

    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Original area</div><div className="mt-1 text-2xl font-black">{result.originalArea.toFixed(0)}</div></div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4"><div className="text-xs text-base-content/55">Image area</div><div className="mt-1 text-2xl font-black">{result.transformedArea.toFixed(0)}</div></div>
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4"><div className="text-xs text-base-content/55">Area ratio</div><div className="mt-1 text-2xl font-black">{result.areaRatio.toFixed(2)}×</div></div>
    </div>

    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="text-xs font-bold uppercase tracking-wider text-primary">Preserved in this transformation</div>
      <div className="mt-3 flex flex-wrap gap-2">{invariants.map((item) => <span key={item} className="badge badge-outline">{item}</span>)}</div>
      {transform === 'reflect' ? <p className="mt-3 text-xs text-base-content/55">Reflection preserves distances and angles but reverses orientation.</p> : null}
      {transform === 'scale' ? <p className="mt-3 text-xs text-base-content/55">Dilation multiplies all lengths by k and area by k².</p> : null}
    </div>
  </div>;
}
