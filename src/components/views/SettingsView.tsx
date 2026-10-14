import React, { useState } from 'react';
import { Bell, Volume2, ShieldCheck, RefreshCw, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Application Settings</h2>
        <p className="text-xs text-slate-500 mt-1">
          Customize biometric units, audio synthesis, and notification preferences.
        </p>
      </div>

      <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 space-y-6">
        {/* Unit Preferences */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Measurement Units</span>
            <span className="text-xs text-slate-400">Kilograms & Centimeters vs Pounds & Inches</span>
          </div>
          <div className="flex items-center p-1 bg-slate-100 rounded-full">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Metric (Kg / Cm)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Imperial (Lbs / In)
            </button>
          </div>
        </div>

        {/* Audio Synthesizer */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Volume2 size={18} />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Sound FX & Delta Sleep Waves</span>
              <span className="text-xs text-slate-400">Play real-time Web Audio chimes on water and workout timer</span>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              soundEnabled ? 'bg-[#89a826]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${
                soundEnabled ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell size={18} />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Hydration & Activity Reminders</span>
              <span className="text-xs text-slate-400">Get gentle daily nudges to log water glasses</span>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              notifications ? 'bg-[#89a826]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform shadow-xs ${
                notifications ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Reset / Backup */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              if (confirm('Reset dashboard metrics to default initial state?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Reset Demo Metrics</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
          >
            {saved ? <Check size={14} /> : null}
            <span>{saved ? 'Preferences Saved' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
