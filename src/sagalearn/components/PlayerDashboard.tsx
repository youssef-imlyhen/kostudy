import React, { useState } from 'react';
import type { Stat, WorldState } from '../types';
import { StatsDisplay } from './StatsDisplay';
import { UserCircleIcon, BoxIcon, JournalIcon, ItemIcon } from './icons';

interface PlayerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  worldState: Partial<WorldState>;
  stats: Stat[];
}

type Tab = 'character' | 'inventory' | 'journal';

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({ isOpen, onClose, worldState, stats }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<Tab>('character');
  const { characterDescription, inventory, journal } = worldState;

  const TabButton: React.FC<{tabName: Tab, icon: React.ReactNode, label: string}> = ({tabName, icon, label}) => {
    const isActive = activeTab === tabName;
    return (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex-1 flex items-center justify-center p-3 font-semibold transition-colors ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
        >
            {icon}
            <span className="ml-2">{label}</span>
        </button>
    )
  }

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center font-sans animate-fade-in"
        onClick={onClose}
    >
        <div 
            className="bg-gray-800 text-white w-full max-w-lg m-4 rounded-xl shadow-2xl border border-gray-700 flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-700 flex-shrink-0">
                <TabButton tabName="character" icon={<UserCircleIcon />} label="Character" />
                <TabButton tabName="inventory" icon={<BoxIcon />} label="Inventory" />
                <TabButton tabName="journal" icon={<JournalIcon />} label="Journal" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                {activeTab === 'character' && (
                    <div className="space-y-6 animate-fade-in">
                        {characterDescription && (
                            <div>
                                <h3 className="text-lg font-semibold text-teal-300 mb-2">Who You Are</h3>
                                <p className="text-gray-300 italic">{characterDescription}</p>
                            </div>
                        )}
                        <div>
                             <h3 className="text-lg font-semibold text-teal-300 mb-3">Your Stats</h3>
                             <div className="relative p-0">
                                 <StatsDisplay stats={stats} isModalVersion={true} />
                             </div>
                        </div>
                    </div>
                )}
                {activeTab === 'inventory' && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-semibold text-teal-300 mb-2">Inventory</h3>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 min-h-[120px]">
                            {inventory && inventory.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {inventory.map((item, index) => (
                                        <div key={index} className="flex flex-col items-center text-center p-2 bg-gray-700/50 rounded-lg">
                                            <ItemIcon />
                                            <span className="mt-2 text-sm text-gray-200">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 pt-4">Your pockets are empty.</p>
                            )}
                        </div>
                    </div>
                )}
                 {activeTab === 'journal' && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-semibold text-teal-300 mb-2">Journal</h3>
                        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                             <p className="text-gray-300 whitespace-pre-wrap">{journal || "No active quests."}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};