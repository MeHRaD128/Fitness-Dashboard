import React, { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { WeightData } from '../types';

interface WeightCardProps {
  data: WeightData;
  onUpdateWeight?: (newKg: number) => void;
}

export const WeightCard: React.FC<WeightCardProps> = ({ data, onUpdateWeight }) => {
  const { currentKg, heightCm, healthyMin, healthyMax, bodyType, completionText, motivationalText, history } = data;
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // Height in meters for BMI: 188cm -> 1.88m
  const heightM = heightCm / 100;
  const bmi = (currentKg / (heightM * heightM)).toFixed(1);

  return (
    <div className="bg-white rounded-[32px] p-6.5 shadow-sm border border-slate-100/70 flex flex-col justify-between h-full min-h-[380px] select-none group">
      {/* Top Header Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
            <MoveHorizontal size={16} strokeWidth={2.3} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              Weight
            </h3>
            <span className="text-xs text-slate-400 font-medium block">
              Healthy weight is {healthyMin} Kg - {healthyMax} Kg
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-extrabold text-slate-900 tabular-nums">
            <span>{heightCm}</span>
            <span className="text-xs font-semibold text-slate-400 ml-1">Cm</span>
          </div>
          <span className="text-xs text-slate-400 font-medium block">
            {bodyType}
          </span>
        </div>
      </div>

      {/* Center Wave Chart */}
      <div className="my-3 relative h-28 flex items-center justify-center">
        <svg
          viewBox="0 0 320 100"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="waveSoftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6" />
            </linearGradient>

            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Secondary background soft wave */}
          <path
            d="M 5,80 C 45,82 80,45 125,48 C 170,51 205,85 255,80 C 285,77 305,62 315,55"
            fill="none"
            stroke="url(#waveSoftGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Primary vibrant cyan-blue sinusoidal wave */}
          <path
            d="M 5,68 C 35,45 60,18 95,20 C 135,22 165,78 205,82 C 245,85 270,38 315,35"
            fill="none"
            stroke="url(#waveCyanGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#waveGlow)"
          />

          {/* Active Data Point on Peak with Halo matching screenshot */}
          <g transform="translate(95, 20)">
            {/* Outer halo */}
            <circle cx="0" cy="0" r="10" fill="#38bdf8" fillOpacity="0.25" />
            {/* White ring */}
            <circle cx="0" cy="0" r="6" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
            {/* Inner cyan core */}
            <circle cx="0" cy="0" r="3" fill="#0284c7" />
          </g>

          {/* Secondary subtle point */}
          <g transform="translate(205, 82)">
            <circle cx="0" cy="0" r="4" fill="#38bdf8" fillOpacity="0.4" />
          </g>
        </svg>

        {/* Hover/Day markers overlay */}
        <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-2 text-[10px] text-slate-400">
          {history.map((item, idx) => (
            <button
              key={item.day}
              onClick={() => {
                setSelectedDayIndex(idx);
                onUpdateWeight?.(item.weight);
              }}
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                selectedDayIndex === idx ? 'text-blue-600 font-bold' : ''
              }`}
            >
              {item.day}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Metric & Completion Note */}
      <div className="flex items-end justify-between pt-2">
        {/* Weight: 82 kg */}
        <div className="flex items-baseline">
          <span className="text-5xl sm:text-6xl font-black text-slate-900 tabular-nums tracking-tight leading-none">
            {currentKg}
          </span>
          <span className="text-xl font-bold text-slate-800 ml-1">
            kg
          </span>
          <span className="ml-3 text-xs text-slate-400 font-medium">
            (BMI {bmi})
          </span>
        </div>

        {/* Weekly Completion & Motivation */}
        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium leading-tight block">
            {completionText}
          </span>
          <span className="text-sm font-extrabold text-slate-900 block mt-1">
            {motivationalText}
          </span>
        </div>
      </div>
    </div>
  );
};
