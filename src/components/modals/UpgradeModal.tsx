import React, { useState } from 'react';
import { X, Crown, Check, Zap, Shield, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [isUpgraded, setIsUpgraded] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setIsUpgraded(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#3b82f6', '#10b981'],
    });
    setTimeout(() => {
      onClose();
      setIsUpgraded(false);
    }, 1800);
  };

  const perks = [
    'Automated sleep architecture & REM recovery score',
    'Custom tailored daily home workout programs with video',
    'Biometric water & mineral electrolyte tracking',
    'Full macro & micronutrient breakdown for 500k+ meals',
    'Real-time sync with Apple Health, Fitbit & Garmin',
    'Priority coaching community & direct trainer Q&A',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
            <Crown size={14} className="fill-amber-300" />
            <span>FitPulse Pro Membership</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Elevate Your Health Potential
          </h3>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Unlock biometric sleep analytics, professional metabolic meal plans, and personalized home routines.
          </p>

          {/* Billing Switcher */}
          <div className="mt-5 flex items-center justify-center p-1 bg-slate-800 rounded-full max-w-xs mx-auto border border-slate-700">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Annual (Save 35%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing & Perks */}
        <div className="p-6 sm:p-7 space-y-5">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-slate-900 tabular-nums">
              {billingCycle === 'annual' ? '$7.99' : '$11.99'}
            </span>
            <span className="text-xs text-slate-500 font-semibold">/ month</span>
            {billingCycle === 'annual' && (
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold ml-2">
                Billed annually ($95/yr)
              </span>
            )}
          </div>

          <div className="space-y-2.5 pt-2">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} strokeWidth={3} />
                </div>
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={handleUpgrade}
              disabled={isUpgraded}
              className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
            >
              {isUpgraded ? (
                <>
                  <Sparkles size={16} className="text-amber-400 animate-spin" />
                  <span>Activating Pro Tier...</span>
                </>
              ) : (
                <>
                  <Zap size={16} className="text-amber-400 fill-amber-400" />
                  <span>Start 14-Day Free Pro Trial</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              No commitment. Cancel anytime with one click in account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
