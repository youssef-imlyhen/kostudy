import { useState } from 'react';

const hsl = (hue: number, saturation: number, lightness: number) => `hsl(${hue} ${saturation}% ${lightness}%)`;

export default function ColorContextLab() {
  const [hue, setHue] = useState(34);
  const [saturation, setSaturation] = useState(55);
  const [patchLightness, setPatchLightness] = useState(55);
  const [leftBackground, setLeftBackground] = useState(18);
  const [rightBackground, setRightBackground] = useState(84);
  const [reveal, setReveal] = useState(false);

  const patch = hsl(hue, saturation, patchLightness);

  return <div className="space-y-5">
    <div className="grid gap-3 sm:grid-cols-2">
      {[leftBackground, rightBackground].map((background, index) => <div key={index} className="relative flex h-56 items-center justify-center overflow-hidden rounded-3xl border border-base-300" style={{ background: hsl(hue, Math.max(4, saturation * 0.25), background) }}>
        <div className="h-28 w-28 rounded-2xl border border-white/20 shadow-xl" style={{ background: patch }} />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold text-white">Background L {background}%</div>
        {reveal ? <div className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold text-white">same patch: {patch}</div> : null}
      </div>)}
    </div>

    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm leading-6"><strong>The two center patches are physically identical.</strong> Their surrounding fields change the contrast relationships your visual system receives, so they can appear lighter, darker, duller, or more vivid.</div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Hue</span><span>{hue}°</span></span><input className="range range-primary range-sm" type="range" min="0" max="360" value={hue} onChange={(event) => setHue(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Saturation</span><span>{saturation}%</span></span><input className="range range-secondary range-sm" type="range" min="0" max="100" value={saturation} onChange={(event) => setSaturation(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Patch lightness</span><span>{patchLightness}%</span></span><input className="range range-accent range-sm" type="range" min="15" max="85" value={patchLightness} onChange={(event) => setPatchLightness(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Left field</span><span>{leftBackground}%</span></span><input className="range range-sm" type="range" min="2" max="95" value={leftBackground} onChange={(event) => setLeftBackground(Number(event.target.value))} /></label>
      <label className="space-y-2"><span className="flex justify-between text-sm"><span>Right field</span><span>{rightBackground}%</span></span><input className="range range-sm" type="range" min="2" max="95" value={rightBackground} onChange={(event) => setRightBackground(Number(event.target.value))} /></label>
    </div>
    <div className="flex flex-wrap gap-2"><button className="btn btn-primary btn-sm" onClick={() => setReveal((value) => !value)}>{reveal ? 'Hide physical values' : 'Reveal identical values'}</button><button className="btn btn-ghost btn-sm" onClick={() => { setLeftBackground(18); setRightBackground(84); }}>Maximize contrast</button><button className="btn btn-ghost btn-sm" onClick={() => { setLeftBackground(50); setRightBackground(50); }}>Match contexts</button></div>
    <p className="text-xs leading-5 text-base-content/55">Screen color is an imperfect proxy for light in the world, and displays differ. The robust lesson is relational: perception depends on both the local stimulus and its context.</p>
  </div>;
}
