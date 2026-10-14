import React from 'react';
import {
  Home,
  Activity,
  MessageSquare,
  CalendarDays,
  Bell,
  Settings,
  LogOut,
  Info,
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenProfile: () => void;
  onOpenInfo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenProfile,
  onOpenInfo,
}) => {
  const navItems = [
    { id: 'home' as TabType, icon: Home, label: 'Overview' },
    { id: 'activity' as TabType, icon: Activity, label: 'Activity' },
    { id: 'messages' as TabType, icon: MessageSquare, label: 'Community' },
    { id: 'calendar' as TabType, icon: CalendarDays, label: 'Schedule' },
    { id: 'notifications' as TabType, icon: Bell, label: 'Alerts' },
    { id: 'settings' as TabType, icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-18 md:w-20 bg-white/70 backdrop-blur-md flex flex-col items-center justify-between py-6 px-2 border-r border-slate-200/60 z-20 shrink-0 select-none">
      {/* Top Logo - Olive-green circular dots matrix */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => onSelectTab('home')}
          className="cursor-pointer group p-1 transition-transform hover:scale-105"
          title="FitPulse Dashboard"
          aria-label="FitPulse Dashboard Home"
        >
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center dot */}
            <circle cx="20" cy="20" r="3.2" fill="#84a625" />
            {/* Inner ring */}
            <circle cx="20" cy="11.5" r="2.8" fill="#8ea832" />
            <circle cx="20" cy="28.5" r="2.8" fill="#8ea832" />
            <circle cx="11.5" cy="20" r="2.8" fill="#8ea832" />
            <circle cx="28.5" cy="20" r="2.8" fill="#8ea832" />
            {/* Diagonal satellites */}
            <circle cx="14" cy="14" r="2.3" fill="#9db93e" />
            <circle cx="26" cy="14" r="2.3" fill="#9db93e" />
            <circle cx="14" cy="26" r="2.3" fill="#9db93e" />
            <circle cx="26" cy="26" r="2.3" fill="#9db93e" />
            {/* Outer accent dots */}
            <circle cx="20" cy="4" r="1.8" fill="#adc94b" />
            <circle cx="20" cy="36" r="1.8" fill="#adc94b" />
            <circle cx="4" cy="20" r="1.8" fill="#adc94b" />
            <circle cx="36" cy="20" r="1.8" fill="#adc94b" />
          </svg>
        </button>

        {/* Navigation Items */}
        <nav className="mt-8 flex flex-col items-center gap-3 w-full" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={item.label}
                aria-label={item.label}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#89a826] text-white shadow-md shadow-[#89a826]/30 scale-100'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.9} />
                {item.id === 'notifications' && (
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions & User Profile */}
      <div className="flex flex-col items-center gap-4 w-full pt-4">
        <button
          onClick={() => {
            if (confirm('Do you want to log out of your session?')) {
              window.location.reload();
            }
          }}
          title="Sign Out"
          aria-label="Sign Out"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <LogOut size={19} strokeWidth={1.8} />
        </button>

        <button
          onClick={onOpenInfo}
          title="Information & Guide"
          aria-label="Information & Guide"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <Info size={19} strokeWidth={1.8} />
        </button>

        {/* User Profile Avatar with olive ring */}
        <button
          onClick={onOpenProfile}
          title="Andreas Profile"
          aria-label="View Andreas Profile"
          className="relative mt-1 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#89a826] to-[#b5d636] transition-transform group-hover:scale-105 shadow-xs">
            <img
              src="/src/assets/images/avatar_athlete_female_1792009738266.jpg"
              alt="User profile"
              className="w-full h-full object-cover rounded-full bg-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>
      </div>
    </aside>
  );
};
