import React from 'react';

interface ClockDigitProps {
  value: string; // Expect single char "0"-"9"
  colorClass: string;
  glowClass: string;
}

const SEGMENTS: Record<string, string[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g', 'e', 'd'],
  '3': ['a', 'b', 'g', 'c', 'd'],
  '4': ['f', 'g', 'b', 'c'],
  '5': ['a', 'f', 'g', 'c', 'd'],
  '6': ['a', 'f', 'e', 'd', 'c', 'g'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g'],
};

const ClockDigit: React.FC<ClockDigitProps> = ({ value, colorClass, glowClass }) => {
  const activeSegments = SEGMENTS[value] || [];

  // Segment path definitions for a standard 7-segment display
  // Coordinate system roughly 0-100 width, 0-180 height
  const paths = {
    a: "M 20 10 L 80 10 L 70 20 L 30 20 Z", // Top
    b: "M 80 10 L 90 20 L 90 80 L 80 90 L 70 80 L 70 20 Z", // Top Right
    c: "M 80 90 L 90 100 L 90 160 L 80 170 L 70 160 L 70 100 Z", // Bottom Right
    d: "M 20 170 L 80 170 L 70 160 L 30 160 Z", // Bottom
    e: "M 10 90 L 20 100 L 20 160 L 10 170 L 0 160 L 0 100 Z", // Bottom Left
    f: "M 10 10 L 20 20 L 20 80 L 10 90 L 0 80 L 0 20 Z", // Top Left
    g: "M 20 80 L 80 80 L 90 90 L 80 100 L 20 100 L 10 90 Z", // Middle
  };

  return (
    <div className="relative w-12 h-24 sm:w-16 sm:h-32 md:w-24 md:h-44 lg:w-32 lg:h-56 mx-1 sm:mx-2">
      <svg viewBox="0 0 100 180" className="w-full h-full overflow-visible drop-shadow-lg">
        {/* Render Ghost Segments (Off state) */}
        {Object.entries(paths).map(([key, d]) => (
          <path
            key={`ghost-${key}`}
            d={d}
            className="fill-neutral-800 opacity-30"
          />
        ))}
        
        {/* Render Active Segments (On state) */}
        {Object.entries(paths).map(([key, d]) => {
          const isActive = activeSegments.includes(key);
          return (
            <path
              key={`active-${key}`}
              d={d}
              className={`transition-all duration-200 ${isActive ? `${colorClass} ${glowClass}` : 'fill-transparent'}`}
              style={{ filter: isActive ? 'blur(0.5px)' : 'none' }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ClockDigit;