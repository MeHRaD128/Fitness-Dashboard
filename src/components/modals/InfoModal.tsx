import React from 'react';
import { X, HelpCircle, Activity, Droplets, Moon, Dumbbell, Flame } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <HelpCircle size={18} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">FitPulse Guide & Features</h3>
              <p className="text-xs text-slate-400">Daily health & wellness activity dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Dumbbell size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Home Workout Module</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Click <strong>Start Free Trial</strong> or the <strong>Explore Now</strong> play button to start a guided interval training workout with sound cues and timer.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Droplets size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hydration Glass Matrix</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Click directly on any of the 28 water glasses in the matrix to log or adjust your water cups. Switch between <strong>Day (D)</strong>, <strong>Week (W)</strong>, and <strong>Month (M)</strong>.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Moon size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Deep Sleep & Audio Synthesizer</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Use the carousel arrows to cycle through 5 research-backed sleep insights. Click the speaker icon to play relaxing 320Hz theta sleep waves.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-lime-50 text-[#84a625] flex items-center justify-center shrink-0">
              <Flame size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Calorie Burning & Macros</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Hover over the 36 hourly energy bars to view your timeline of active metabolic output and macro breakdown (carbs, protein, fats).
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Activity size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Weight & BMI Sine Wave</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                View your weekly weight progression curve and BMI calculation based on 188cm height.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-black cursor-pointer transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
