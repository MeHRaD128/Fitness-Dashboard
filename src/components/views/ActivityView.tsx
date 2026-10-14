import React from 'react';
import { Heart, Footprints, Zap, ArrowUpRight } from 'lucide-react';

export const ActivityView: React.FC = () => {
  const heartRateZones = [
    { zone: 'Zone 1: Recovery', range: '100 - 120 bpm', pct: 25, color: 'bg-blue-400' },
    { zone: 'Zone 2: Fat Burn', range: '120 - 145 bpm', pct: 45, color: 'bg-emerald-400' },
    { zone: 'Zone 3: Cardio Aerobic', range: '145 - 165 bpm', pct: 20, color: 'bg-amber-400' },
    { zone: 'Zone 4: Peak Anaerobic', range: '165 - 185 bpm', pct: 10, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Activity Analytics</h2>
        <p className="text-xs text-slate-500 mt-1">
          Detailed metrics across cardiovascular load, daily steps, and training density.
        </p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">Total Steps</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tabular-nums">11,420</div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight size={13} /> +12% from yesterday
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Footprints size={24} />
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">Resting Heart Rate</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tabular-nums">58 <span className="text-sm font-semibold text-slate-400">bpm</span></div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              Optimal athletic range
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <Heart size={24} />
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">Active Training Time</span>
            <div className="text-3xl font-black text-slate-900 mt-1 tabular-nums">54 <span className="text-sm font-semibold text-slate-400">mins</span></div>
            <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-1">
              Goal: 45 mins/day
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Zap size={24} />
          </div>
        </div>
      </div>

      {/* Heart Rate Zones */}
      <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100">
        <h3 className="text-lg font-black text-slate-900 mb-4">Cardiovascular Zone Distribution</h3>
        <div className="space-y-4">
          {heartRateZones.map((zone, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">{zone.zone}</span>
                <span className="text-slate-400 font-mono">{zone.range} ({zone.pct}%)</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${zone.pct}%` }}
                  className={`h-full ${zone.color} rounded-full transition-all duration-500`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
