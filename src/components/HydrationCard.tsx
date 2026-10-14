import React from 'react';
import confetti from 'canvas-confetti';
import { TimeRange, HydrationData } from '../types';
import { soundEngine } from '../utils/audio';

interface HydrationCardProps {
  data: HydrationData;
  onUpdateGlasses: (count: number) => void;
  onUpdateTimeRange: (range: TimeRange) => void;
}

export const HydrationCard: React.FC<HydrationCardProps> = ({
  data,
  onUpdateGlasses,
  onUpdateTimeRange,
}) => {
  const { dailyLitres, glassesDrank, totalGlasses, timeRange } = data;

  const handleGlassClick = (index: number) => {
    soundEngine.playWaterChime();
    // If clicked on an already drank glass and it's the last one, decrement; otherwise set to index + 1
    const newCount = index + 1 === glassesDrank ? glassesDrank - 1 : index + 1;
    onUpdateGlasses(newCount);

    if (newCount >= totalGlasses * 0.85) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#60a5fa', '#38bdf8', '#d9f99d', '#ffffff'],
      });
    }
  };

  // 4 rows of 7 glasses
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5, 6];

  // Format litre display based on range
  const displayLitre = timeRange === 'D' 
    ? `${dailyLitres.toFixed(2)}L`
    : timeRange === 'W' 
    ? `${(dailyLitres * 7).toFixed(1)}L`
    : `${(dailyLitres * 30).toFixed(0)}L`;

  const displayPeriod = timeRange === 'D' ? '/Day' : timeRange === 'W' ? '/Week' : '/Month';

  return (
    <div className="rounded-[32px] bg-gradient-to-br from-[#4ea2ea] to-[#2489e5] p-7 text-white shadow-sm flex flex-col justify-between min-h-[380px] lg:h-[400px] select-none relative overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Left Information */}
        <div className="max-w-[210px]">
          <h3 className="text-xl font-bold tracking-tight text-white">
            Hydration Status
          </h3>
          <p className="text-xs text-blue-100 font-normal mt-1.5 leading-relaxed">
            Drive your goal water daily. Build healthy habits and achieve your focus.
          </p>

          <div className="mt-4">
            <span className="bg-[#d7f035] hover:bg-[#cde62d] text-slate-900 text-xs font-black px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-default">
              <span>Well Done</span>
              <span className="text-sm">👍</span>
            </span>
          </div>
        </div>

        {/* Right Matrix of Water Glasses (4 rows x 7 cols) */}
        <div className="flex flex-col gap-1.5 self-end sm:self-start bg-white/10 p-3 rounded-2xl backdrop-blur-xs border border-white/15">
          {rows.map((row) => (
            <div key={row} className="flex gap-1.5">
              {cols.map((col) => {
                // Fill from bottom to top, left to right
                // Row 3 is bottom (index 0..6), row 0 is top (index 21..27)
                const invertedRow = 3 - row;
                const glassIndex = invertedRow * 7 + col;
                const isFilled = glassIndex < glassesDrank;

                return (
                  <button
                    key={col}
                    onClick={() => handleGlassClick(glassIndex)}
                    title={`Glass ${glassIndex + 1}: ${isFilled ? 'Filled' : 'Empty'}`}
                    className="w-4.5 h-6.5 rounded-xs transition-all duration-150 transform hover:scale-120 cursor-pointer focus:outline-none"
                    aria-label={`Water cup ${glassIndex + 1}`}
                  >
                    <svg viewBox="0 0 20 28" className="w-full h-full drop-shadow-xs">
                      {/* Glass silhouette - tapered tumbler shape */}
                      <path
                        d="M2 2 L18 2 L15.5 25 C15.3 26.5 14 27.5 12.5 27.5 L7.5 27.5 C6 27.5 4.7 26.5 4.5 25 Z"
                        fill={isFilled ? '#ffffff' : 'rgba(255, 255, 255, 0.28)'}
                        stroke={isFilled ? '#ffffff' : 'rgba(255, 255, 255, 0.45)'}
                        strokeWidth="1.2"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between pt-4">
        {/* Time Filters: D, W, M */}
        <div className="flex items-center gap-2">
          {(['D', 'W', 'M'] as TimeRange[]).map((range) => {
            const isActive = timeRange === range;
            return (
              <button
                key={range}
                onClick={() => onUpdateTimeRange(range)}
                className={`w-9 h-9 rounded-full text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-800 shadow-md scale-105'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                aria-label={`View by ${range === 'D' ? 'Day' : range === 'W' ? 'Week' : 'Month'}`}
              >
                {range}
              </button>
            );
          })}
        </div>

        {/* Large Metric: 2.15L /Day */}
        <div className="text-right">
          <div className="text-5xl font-black text-white tracking-tight tabular-nums leading-none">
            {displayLitre}
          </div>
          <span className="text-lg text-blue-100 font-semibold block mt-1">
            {displayPeriod}
          </span>
        </div>
      </div>
    </div>
  );
};
