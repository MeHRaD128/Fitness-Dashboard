import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Moon, Volume2, VolumeX } from 'lucide-react';
import { SleepInsight } from '../types';
import { soundEngine } from '../utils/audio';

interface SleepCardProps {
  insights: SleepInsight[];
}

export const SleepCard: React.FC<SleepCardProps> = ({ insights }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // 0-indexed -> 1 is slide 2 (shows 2/5 like screenshot)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const currentInsight = insights[currentIndex] || insights[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? insights.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === insights.length - 1 ? 0 : prev + 1));
  };

  const toggleSound = () => {
    const active = soundEngine.toggleSleepSound();
    setIsAudioPlaying(active);
  };

  return (
    <div className="bg-white rounded-[32px] p-6.5 shadow-sm border border-slate-100/70 flex flex-col justify-between h-full min-h-[380px] select-none group">
      {/* Top Header Section */}
      <div>
        {/* Avatars */}
        <div className="flex -space-x-1.5 items-center">
          <img
            src="/src/assets/images/avatar_athlete_female_1792009738266.jpg"
            alt="Sleep Research Specialist"
            className="w-7 h-7 rounded-full border border-white object-cover"
            referrerPolicy="no-referrer"
          />
          <img
            src="/src/assets/images/avatar_athlete_male_1792009738421.jpg"
            alt="Health Specialist"
            className="w-7 h-7 rounded-full border border-white object-cover"
            referrerPolicy="no-referrer"
          />
          <img
            src="/src/assets/images/avatar_user_andreas_1792009739355.jpg"
            alt="User"
            className="w-7 h-7 rounded-full border border-white object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-slate-900 mt-3.5 leading-snug tracking-tight">
          {currentInsight.title}
        </h3>
      </div>

      {/* Middle Card: Deep Sleep Highlight Container */}
      <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4.5 my-3 relative transition-all">
        <div className="flex items-center justify-between">
          {/* Badge: 🌙 Deep sleep */}
          <span className="bg-white border border-slate-200/80 rounded-full px-3 py-1 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 shadow-2xs">
            <Moon size={13} className="text-indigo-500 fill-indigo-100" />
            <span>{currentInsight.badge}</span>
          </span>

          {/* Ambient Sleep Sound Generator Toggle */}
          <button
            onClick={toggleSound}
            title={isAudioPlaying ? 'Stop soothing rain sound' : 'Play soothing theta rain sound'}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isAudioPlaying
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            {isAudioPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 font-normal leading-relaxed mt-3.5">
          {currentInsight.description}
        </p>

        {isAudioPlaying && (
          <div className="mt-2 text-[11px] text-indigo-600 font-semibold flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Playing soothing 320Hz theta delta waves...</span>
          </div>
        )}
      </div>

      {/* Bottom Pager Controls: 2/5 and Navigation Arrows */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-sm font-black text-slate-900 tabular-nums">
          <span>{currentIndex + 1}</span>
          <span className="text-slate-400 font-medium">/{insights.length}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            aria-label="Previous sleep tip"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next sleep tip"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
};
