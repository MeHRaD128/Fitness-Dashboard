import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface WorkoutHeroCardProps {
  onStartTrial: () => void;
  onExploreNow: () => void;
}

export const WorkoutHeroCard: React.FC<WorkoutHeroCardProps> = ({
  onStartTrial,
  onExploreNow,
}) => {
  return (
    <div className="relative rounded-[32px] overflow-hidden bg-[#2470f0] min-h-[380px] lg:h-[400px] shadow-sm flex flex-col justify-between p-7 text-white select-none group">
      {/* Background Hero Athlete Image */}
      <img
        src="/src/assets/images/hero_workout_pushup_1792009738041.jpg"
        alt="Athletic Workout"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out group-hover:scale-102"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Lighting Overlays to ensure 100% typography contrast matching design */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-900/30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-80 h-44 bg-gradient-to-br from-blue-700/60 to-transparent pointer-events-none" />

      {/* Top Left: Bold Headline */}
      <div className="relative z-10 max-w-xs sm:max-w-md">
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white leading-[1.12] tracking-tight drop-shadow-xs">
          Your Home Workout
          <br />
          Starts Here!
        </h2>
      </div>

      {/* Center: Frosted Glass Play Button & "Explore Now" */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <button
          onClick={onExploreNow}
          className="pointer-events-auto flex flex-col items-center group/play cursor-pointer focus:outline-none"
          title="Play workout preview"
        >
          <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-hover/play:scale-115 group-hover/play:bg-white/35">
            <Play size={18} className="fill-white translate-x-0.5" />
          </div>
          <span className="text-xs font-semibold text-white tracking-wide mt-2 drop-shadow-sm group-hover/play:underline">
            Explore Now
          </span>
        </button>
      </div>

      {/* Bottom Row: Social Proof (Left) & CTA Button (Right) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4">
        {/* Social Proof */}
        <div>
          <span className="text-xs text-blue-100/90 font-medium block mb-2">
            Join program with:
          </span>
          <div className="flex items-center">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2.5">
              <img
                src="/src/assets/images/avatar_athlete_female_1792009738266.jpg"
                alt="Member"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="/src/assets/images/avatar_athlete_male_1792009738421.jpg"
                alt="Member"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
              <img
                src="/src/assets/images/avatar_user_andreas_1792009739355.jpg"
                alt="Member"
                className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Member Count */}
            <div className="ml-3">
              <span className="text-sm font-black text-white leading-none block">
                5.8K+
              </span>
              <span className="text-[11px] text-blue-100 font-medium leading-none block mt-0.5">
                Members
              </span>
            </div>
          </div>
        </div>

        {/* Start Free Trial CTA Button */}
        <button
          onClick={onStartTrial}
          className="bg-black hover:bg-neutral-900 active:scale-98 text-white pl-6 pr-2.5 py-2.5 rounded-full flex items-center gap-3.5 font-semibold text-sm shadow-md transition-all cursor-pointer group/cta"
        >
          <span className="tracking-wide">Start Free Trial</span>
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center transition-transform group-hover/cta:translate-x-1 shadow-sm">
            <ArrowRight size={15} strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  );
};
