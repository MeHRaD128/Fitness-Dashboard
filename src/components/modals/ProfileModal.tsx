import React, { useState } from 'react';
import { X, User, Heart, Target, BellRing, Save } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
}) => {
  const [name, setName] = useState(userName);
  const [email] = useState('andreas.vance@fitpulse.io');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserName(name);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#89a826] to-[#b5d636] shadow-md">
              <img
                src="/src/assets/images/avatar_athlete_female_1792009738266.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-black">{userName}</h3>
              <p className="text-xs text-slate-300">{email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold bg-[#89a826] text-white px-2 py-0.5 rounded-full">
                FitPulse Pro Member
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 font-medium focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Target size={13} />
                <span>Daily Calories Target</span>
              </div>
              <span className="text-sm font-black text-slate-800">2,350 Kcal</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Heart size={13} />
                <span>Hydration Goal</span>
              </div>
              <span className="text-sm font-black text-slate-800">2.80 Litres</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Save size={14} />
              <span>{isSaved ? 'Changes Saved!' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
