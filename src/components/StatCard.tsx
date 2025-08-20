import React from 'react';

// Reusable Stat Card component
interface StatCardProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  color: string;
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  const bgClass = `bg-${color}/10`;

  return (
    <div className="bg-base-100 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center text-center h-full border-2 border-b-4 border-base-300">
      <div className={`w-12 h-12 ${bgClass} rounded-full flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <span className="text-sm font-medium mb-1 text-base-content/80">{label}</span>
      <span className={`font-bold text-2xl text-base-content`}>{value}</span>
    </div>
  );
}