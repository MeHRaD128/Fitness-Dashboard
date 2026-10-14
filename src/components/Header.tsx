import React, { useState, useRef, useEffect } from 'react';
import { Search, Crown, X, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenUpgrade: () => void;
  onOpenQuickLog: () => void;
  onSearchSelect?: (item: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUpgrade,
  onOpenQuickLog,
  onSearchSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchableItems = [
    { label: 'Hydration & Water Intake', category: 'Metric', action: 'hydration' },
    { label: 'Daily Calorie Deficit & Macros', category: 'Metric', action: 'calories' },
    { label: 'Body Weight & BMI Tracker', category: 'Metric', action: 'weight' },
    { label: 'Deep Sleep Optimization Protocol', category: 'Sleep', action: 'sleep' },
    { label: 'Home Push-Up & Dip Routine', category: 'Workout', action: 'workout' },
    { label: 'Protein Synthesis Target (164g)', category: 'Nutrition', action: 'macros' },
  ];

  const filteredItems = searchQuery.trim()
    ? searchableItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 pt-2">
      {/* Left Title Lockup */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
          Hi, Andreas!
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Let&apos;s look at your daily activity overview.
        </p>
      </div>

      {/* Right Controls: Search, Quick Log & Upgrade Button */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div ref={searchRef} className="relative w-full sm:w-72 md:w-80">
          <div className="relative flex items-center">
            <Search
              size={17}
              className="absolute left-4 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for healthy metrics"
              className="w-full bg-white/90 hover:bg-white focus:bg-white text-slate-800 text-sm pl-11 pr-9 py-2.5 rounded-full border border-slate-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Live Search Suggestions Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Matching Results ({filteredItems.length})
              </div>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSearchSelect?.(item.action);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-slate-800">{item.label}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-slate-500 text-center">
                  No matching metric found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Log Button */}
        <button
          onClick={onOpenQuickLog}
          title="Log Metric"
          className="hidden lg:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
        >
          <Plus size={15} className="text-blue-600" />
          <span>Log</span>
        </button>

        {/* Upgrade Button */}
        <button
          onClick={onOpenUpgrade}
          className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap group shrink-0"
        >
          <Crown size={16} className="text-amber-400 fill-amber-400 transition-transform group-hover:rotate-12" />
          <span>Upgrade</span>
        </button>
      </div>
    </header>
  );
};
