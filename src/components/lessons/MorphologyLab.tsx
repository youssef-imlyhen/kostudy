import { useMemo, useState } from 'react';

interface Morpheme {
  form: string;
  meaning: string;
  role: string;
}

const prefixes: Morpheme[] = [
  { form: '', meaning: '', role: 'no prefix' },
  { form: 'un', meaning: 'not / reverse', role: 'prefix' },
  { form: 're', meaning: 'again', role: 'prefix' },
  { form: 'pre', meaning: 'before', role: 'prefix' },
  { form: 'anti', meaning: 'against', role: 'prefix' },
];

const roots: Morpheme[] = [
  { form: 'view', meaning: 'see', role: 'root' },
  { form: 'write', meaning: 'make written language', role: 'root' },
  { form: 'cycle', meaning: 'move through a repeating loop', role: 'root' },
  { form: 'form', meaning: 'shape or organize', role: 'root' },
  { form: 'read', meaning: 'interpret written signs', role: 'root' },
];

const suffixes: Morpheme[] = [
  { form: '', meaning: '', role: 'no suffix' },
  { form: 'er', meaning: 'person or thing that does', role: 'suffix' },
  { form: 'able', meaning: 'capable of being', role: 'suffix' },
  { form: 'ing', meaning: 'ongoing process', role: 'suffix' },
  { form: 'less', meaning: 'without', role: 'suffix' },
];

const combinations: Record<string, string> = {
  reviewer: 'a person who views or evaluates again',
  preview: 'a view before the main event',
  rewriting: 'the process of writing again',
  recyclable: 'capable of being cycled into use again',
  formless: 'without a defined form',
  unreadable: 'not capable of being read',
};

export default function MorphologyLab() {
  const [prefixIndex, setPrefixIndex] = useState(2);
  const [rootIndex, setRootIndex] = useState(0);
  const [suffixIndex, setSuffixIndex] = useState(1);

  const result = useMemo(() => {
    const prefix = prefixes[prefixIndex];
    const root = roots[rootIndex];
    const suffix = suffixes[suffixIndex];
    const rawWord = `${prefix.form}${root.form}${suffix.form}`;
    const conventionalMeaning = combinations[rawWord];
    const parts = [prefix, root, suffix].filter((part) => part.form);
    const composed = parts.map((part) => part.meaning).filter(Boolean).join(' + ');
    return { prefix, root, suffix, rawWord, conventionalMeaning, composed };
  }, [prefixIndex, rootIndex, suffixIndex]);

  const applyPreset = (prefix: string, root: string, suffix: string) => {
    setPrefixIndex(prefixes.findIndex((item) => item.form === prefix));
    setRootIndex(roots.findIndex((item) => item.form === root));
    setSuffixIndex(suffixes.findIndex((item) => item.form === suffix));
  };

  return <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden">
    <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5 sm:p-7">
      <div className="text-xs font-bold uppercase tracking-wider text-primary">Constructed form</div>
      <div className="mt-2 break-all text-4xl font-black tracking-tight sm:text-5xl">{result.rawWord}</div>
      <div className="mt-3 text-sm leading-6 text-base-content/70">{result.conventionalMeaning || `Literal composition: ${result.composed}. This combination may be understandable without being a conventional English word.`}</div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[result.prefix, result.root, result.suffix].map((part, index) => <div key={`${part.role}-${index}`} className={`rounded-2xl border p-4 ${part.form ? 'border-primary/20 bg-base-100' : 'border-dashed border-base-300 bg-base-100/50'}`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-base-content/45">{part.role}</div>
          <div className="mt-1 text-xl font-black">{part.form || '∅'}</div>
          <div className="mt-1 text-xs leading-5 text-base-content/60">{part.meaning || 'No meaning added here'}</div>
        </div>)}
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      <label className="space-y-2"><span className="text-sm font-semibold">Prefix</span><select className="select select-bordered w-full" value={prefixIndex} onChange={(event) => setPrefixIndex(Number(event.target.value))}>{prefixes.map((item, index) => <option key={`${item.form}-${index}`} value={index}>{item.form || '— none —'} · {item.meaning || 'no added meaning'}</option>)}</select></label>
      <label className="space-y-2"><span className="text-sm font-semibold">Root</span><select className="select select-bordered w-full" value={rootIndex} onChange={(event) => setRootIndex(Number(event.target.value))}>{roots.map((item, index) => <option key={item.form} value={index}>{item.form} · {item.meaning}</option>)}</select></label>
      <label className="space-y-2"><span className="text-sm font-semibold">Suffix</span><select className="select select-bordered w-full" value={suffixIndex} onChange={(event) => setSuffixIndex(Number(event.target.value))}>{suffixes.map((item, index) => <option key={`${item.form}-${index}`} value={index}>{item.form || '— none —'} · {item.meaning || 'no added meaning'}</option>)}</select></label>
    </div>

    <div className="flex flex-wrap gap-2"><span className="self-center text-xs font-semibold text-base-content/55">Try conventional examples:</span><button type="button" className="btn btn-ghost btn-sm" onClick={() => applyPreset('re', 'view', 'er')}>reviewer</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => applyPreset('pre', 'view', '')}>preview</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => applyPreset('un', 'read', 'able')}>unreadable</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => applyPreset('', 'form', 'less')}>formless</button></div>
    <p className="text-xs leading-5 text-base-content/55">Morphemes are reusable form–meaning units, but language is not free algebra. Sound changes, spelling rules, history, and convention can block or reshape otherwise understandable combinations.</p>
  </div>;
}
