import React, { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import type { Stat, WorldState } from '../types';
import { StatsDisplay } from './StatsDisplay';
import { UserCircleIcon, BoxIcon, JournalIcon, ItemIcon } from './icons';

interface PlayerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  worldState: Partial<WorldState>;
  stats: Stat[];
}

const dashboardTabs = [
  { label: 'Character', icon: UserCircleIcon },
  { label: 'Inventory', icon: BoxIcon },
  { label: 'Journal', icon: JournalIcon },
] as const;

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({ isOpen, onClose, worldState, stats }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { characterDescription, inventory, journal } = worldState;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 font-sans">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          id="player-dashboard-dialog"
          className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-800 text-white shadow-2xl"
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-700 p-4">
            <DialogTitle id="player-dashboard-title" className="text-2xl font-bold text-white">
              Dashboard
            </DialogTitle>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close dashboard"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-3xl leading-none text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex min-h-0 flex-1 flex-col">
            <TabList aria-label="Dashboard sections" className="flex flex-shrink-0 border-b border-gray-700">
              {dashboardTabs.map(({ label, icon: Icon }) => (
                <Tab
                  key={label}
                  type="button"
                  className={({ selected }) => `flex min-h-12 flex-1 items-center justify-center p-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-300 ${
                    selected ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <span aria-hidden="true"><Icon /></span>
                  <span className="ml-2">{label}</span>
                </Tab>
              ))}
            </TabList>

            <TabPanels className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
              <TabPanel className="space-y-6 p-6 focus:outline-none">
                {characterDescription ? (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-teal-300">Who You Are</h3>
                    <p className="text-gray-300 italic">{characterDescription}</p>
                  </div>
                ) : null}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-teal-300">Your Stats</h3>
                  <div className="relative p-0">
                    <StatsDisplay stats={stats} isModalVersion />
                  </div>
                </div>
              </TabPanel>

              <TabPanel className="p-6 focus:outline-none">
                <h3 className="mb-2 text-lg font-semibold text-teal-300">Inventory</h3>
                <div className="min-h-[120px] rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  {inventory && inventory.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {inventory.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex flex-col items-center rounded-lg bg-gray-700/50 p-2 text-center">
                          <ItemIcon />
                          <span className="mt-2 text-sm text-gray-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="pt-4 text-center text-gray-500">Your pockets are empty.</p>
                  )}
                </div>
              </TabPanel>

              <TabPanel className="p-6 focus:outline-none">
                <h3 className="mb-2 text-lg font-semibold text-teal-300">Journal</h3>
                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-4">
                  <p className="whitespace-pre-wrap text-gray-300">{journal || 'No active quests.'}</p>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
