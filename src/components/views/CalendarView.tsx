import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, Dumbbell } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Wednesday');

  const scheduleDays = [
    { day: 'Mon', full: 'Monday', date: '12', workout: 'Upper Body Core & Dips', status: 'completed' },
    { day: 'Tue', full: 'Tuesday', date: '13', workout: 'Active Recovery & Walk', status: 'completed' },
    { day: 'Wed', full: 'Wednesday', date: '14', workout: 'Home Push-Up Progression', status: 'today' },
    { day: 'Thu', full: 'Thursday', date: '15', workout: 'Lower Body & Mobility', status: 'upcoming' },
    { day: 'Fri', full: 'Friday', date: '16', workout: 'HIIT Conditioning 30M', status: 'upcoming' },
    { day: 'Sat', full: 'Saturday', date: '17', workout: 'Outdoor Run & Calisthenics', status: 'upcoming' },
    { day: 'Sun', full: 'Sunday', date: '18', workout: 'Rest & Deep Sleep Reset', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Workout Schedule</h2>
        <p className="text-xs text-slate-500 mt-1">
          Structured 7-day training split focused on progressive overload and recovery.
        </p>
      </div>

      {/* Week Strip */}
      <div className="grid grid-cols-7 gap-2.5 bg-white p-4 rounded-[28px] shadow-sm border border-slate-100">
        {scheduleDays.map((item) => {
          const isSelected = selectedDay === item.full;
          const isToday = item.status === 'today';
          const isDone = item.status === 'completed';

          return (
            <button
              key={item.day}
              onClick={() => setSelectedDay(item.full)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : isToday
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-[11px] font-semibold opacity-75">{item.day}</span>
              <span className="text-lg font-black my-1 tabular-nums">{item.date}</span>
              {isDone ? (
                <CheckCircle2 size={13} className="text-emerald-500" />
              ) : isToday ? (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Workout Card */}
      <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Dumbbell size={20} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {selectedDay}&apos;s Session
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {scheduleDays.find((d) => d.full === selectedDay)?.workout}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <Clock size={14} />
            <span>28 Mins</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-2">
          <div className="font-semibold text-slate-800">Warm-up & Activation:</div>
          <ul className="list-disc list-inside space-y-1 text-slate-500">
            <li>Arm circles & thoracic mobility drill (3 mins)</li>
            <li>Incline plank shoulder taps (2 sets × 20 reps)</li>
            <li>Scapular retraction push-up holds (2 sets × 10 reps)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
