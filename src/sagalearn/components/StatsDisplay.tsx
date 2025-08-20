import React from 'react';
import type { Stat } from '../types';
import { HeartIcon, ManaIcon, StaminaIcon, ShieldIcon } from './icons';

interface StatsDisplayProps {
  stats: Stat[];
  isModalVersion?: boolean;
}

const StatIcon: React.FC<{ name: string }> = ({ name }) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('health') || lowerName.includes('integrity')) return <HeartIcon />;
    if (lowerName.includes('mana') || lowerName.includes('energy') || lowerName.includes('aether')) return <ManaIcon />;
    if (lowerName.includes('stamina') || lowerName.includes('focus') || lowerName.includes('resonance')) return <StaminaIcon />;
    if (lowerName.includes('shield')) return <ShieldIcon />;
    return null;
}

const StatBar: React.FC<{ stat: Stat }> = ({ stat }) => {
  const percentage = stat.maxValue ? (stat.value / stat.maxValue) * 100 : 100;
  
  let barColor = 'bg-sky-500';
  const nameLower = stat.name.toLowerCase();

  if (nameLower.includes('health') || nameLower.includes('integrity')) {
    barColor = 'bg-red-500';
    if(percentage > 30) barColor = 'bg-yellow-500';
    if(percentage > 70) barColor = 'bg-green-500';
  } else if (nameLower.includes('mana') || nameLower.includes('energy') || nameLower.includes('aether')) {
    barColor = 'bg-blue-500';
  } else if (nameLower.includes('stamina') || nameLower.includes('focus') || nameLower.includes('resonance')) {
    barColor = 'bg-yellow-400';
  } else if (nameLower.includes('shield')) {
    barColor = 'bg-cyan-500';
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-xs font-semibold mb-1">
        <span className="flex items-center"><StatIcon name={stat.name}/>{stat.name}</span>
        <span>{stat.value} / {stat.maxValue}</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-2.5">
        <div className={`${barColor} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const StatValue: React.FC<{ stat: Stat }> = ({ stat }) => (
    <div className="flex items-center justify-between text-sm py-1">
        <span className="font-semibold flex items-center"><StatIcon name={stat.name}/>{stat.name}</span>
        <span className="ml-2 font-bold text-lg">{stat.value}</span>
    </div>
);


export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, isModalVersion = false }) => {
  if (!stats || stats.length === 0) {
    return null;
  }

  if (isModalVersion) {
    return (
        <div className="space-y-3 text-white">
           {stats.map(stat => (
            <div key={stat.name}>
                {stat.maxValue ? <StatBar stat={stat} /> : <StatValue stat={stat} />}
            </div>
           ))}
        </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 p-4 w-full sm:w-1/3 max-w-xs font-sans" aria-label="Character Stats">
        <div className="bg-black/60 backdrop-blur-sm p-3 rounded-lg shadow-2xl space-y-3 text-white">
           {stats.map(stat => (
            <div key={stat.name}>
                {stat.maxValue ? <StatBar stat={stat} /> : <StatValue stat={stat} />}
            </div>
           ))}
        </div>
    </div>
  );
};