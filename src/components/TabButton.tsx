import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  responsive?: boolean;
}

export default function TabButton({ isActive, onClick, icon, label, responsive = true }: TabButtonProps) {
  const abbreviated = label.split(' ').map((word) => word.charAt(0)).join('').toUpperCase();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-label={label}
      className={`tab tab-lg flex-1 rounded-2xl border-2 border-b-4 font-bold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 ${
        isActive
          ? 'tab-active !bg-primary !text-primary-content -translate-y-0.5 shadow-lg'
          : 'hover:-translate-y-0.5 hover:bg-base-200/80'
      }`}
      onClick={onClick}
    >
      <span aria-hidden="true" className="mr-2">{icon}</span>
      {responsive ? (
        <>
          <span className="hidden xs:inline">{label}</span>
          <span className="xs:hidden" aria-hidden="true">{abbreviated || label.charAt(0)}</span>
        </>
      ) : label}
    </button>
  );
}
