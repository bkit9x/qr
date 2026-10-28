import React from 'react';

interface BackgroundEffectsProps {
  enabled?: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ enabled = true }) => {
  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[#0b1120]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
    >
      <div className="neon-ambient-glow" />
      <div className="neon-grid-mesh" />
    </div>
  );
};
