import React, { useState } from 'react';
import { Flame } from 'lucide-react';
import { CalorieData } from '../types';

interface CaloriesCardProps {
  data: CalorieData;
  onLogMeal?: () => void;
}

export const CaloriesCard: React.FC<CaloriesCardProps> = ({ data, onLogMeal }) => {
  const [hoveredBar, setHoveredBar] = useState<{ hour: string; value: number; index: number } | null>(null);

  const { consumed, target, status, macros, hourlyBars } = data;

  // Format with period separator matching screenshot: "2.040" and "2.350"
  const formattedConsumed = (consumed / 1000).toFixed(3);
  const formattedTarget = (target / 1000).toFixed(3);

  return (
    <div className="bg-white rounded-[32px] p-6.5 shadow-sm border border-slate-100/70 flex flex-col justify-between h-full min-h-[380px] select-none group">
      {/* Top Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Flame size={16} className="fill-white" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Calories
            </h3>
            <span className="text-xs text-slate-400 font-medium block">
              {status}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-extrabold text-slate-900 tabular-nums">
            <span>{formattedTarget}</span>
            <span className="text-xs font-semibold text-slate-400 ml-1">Kcal</span>
          </div>
          <span className="text-xs text-slate-400 font-medium block">
            Daily dose
          </span>
        </div>
      </div>

      {/* Primary Value: 2.040 /Kcal */}
      <div className="mt-4 mb-2">
        <div className="flex items-baseline">
          <span className="text-4xl sm:text-[44px] font-black text-slate-900 tabular-nums tracking-tight leading-none">
            {formattedConsumed}
          </span>
          <span className="text-sm font-semibold text-slate-400 ml-1">
            /Kcal
          </span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="my-2 relative">
        {/* Min / Max Labels */}
        <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-1.5 px-0.5">
          <span>0</span>
          <span>{formattedTarget}</span>
        </div>

        {/* 36 Vertical Olive-lime Bars */}
        <div className="flex items-end justify-between gap-[3px] h-14 pt-1">
          {hourlyBars.map((bar, i) => {
            const barHeightPct = Math.max(20, Math.min(100, (bar.value / 70) * 100));
            const isHovered = hoveredBar?.index === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredBar({ ...bar, index: i })}
                onMouseLeave={() => setHoveredBar(null)}
                className="flex-1 h-full flex items-end cursor-pointer group/bar relative"
              >
                <div
                  style={{ height: `${barHeightPct}%` }}
                  className={`w-full rounded-full transition-all duration-150 ${
                    isHovered
                      ? 'bg-[#76911c] scale-y-105'
                      : 'bg-[#9cb928] hover:bg-[#86a224]'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Bar Tooltip on Hover */}
        {hoveredBar && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-md whitespace-nowrap z-20 pointer-events-none">
            <span>{hoveredBar.hour}: {hoveredBar.value * 32} Kcal</span>
          </div>
        )}
      </div>

      {/* Bottom Macro Breakdown: Carbohydrates, Proteins, Fats */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100/80">
        {/* Carbohydrates */}
        <div>
          <div className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {macros.carbs}
            <span className="text-xs font-normal text-slate-400 ml-1">Gram</span>
          </div>
          <span className="text-xs text-slate-500 font-medium block mt-0.5">
            Carbohydrates
          </span>
        </div>

        {/* Proteins */}
        <div>
          <div className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {macros.protein}
            <span className="text-xs font-normal text-slate-400 ml-1">Gram</span>
          </div>
          <span className="text-xs text-slate-500 font-medium block mt-0.5">
            Proteins
          </span>
        </div>

        {/* Fats */}
        <div>
          <div className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
            {macros.fats}
            <span className="text-xs font-normal text-slate-400 ml-1">Gram</span>
          </div>
          <span className="text-xs text-slate-500 font-medium block mt-0.5">
            Fats
          </span>
        </div>
      </div>
    </div>
  );
};
