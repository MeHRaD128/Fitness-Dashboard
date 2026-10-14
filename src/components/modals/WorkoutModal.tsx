import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Flame, Timer, Award } from 'lucide-react';
import { featuredWorkoutProgram } from '../../data/mockData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteWorkout: (calories: number) => void;
}

export const WorkoutModal: React.FC<WorkoutModalProps> = ({
  isOpen,
  onClose,
  onCompleteWorkout,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isActive, setIsActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const program = featuredWorkoutProgram;
  const currentEx = program.exercises[currentExerciseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            soundEngine.playBeep(440, 0.08);
          } else if (prev === 1) {
            soundEngine.playBeep(880, 0.25);
          }
          return prev - 1;
        });
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      if (!completedExercises.includes(currentExerciseIndex)) {
        setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, currentExerciseIndex, completedExercises]);

  if (!isOpen) return null;

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(45);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < program.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      resetTimer();
    } else {
      // Workout Complete!
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
      });
      onCompleteWorkout(program.caloriesBurn);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="relative bg-[#2069e0] text-white p-6 sm:p-7 flex justify-between items-start">
          <div className="max-w-md">
            <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              Guided Workout Session
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {program.title}
            </h2>
            <p className="text-xs text-blue-100 font-medium mt-1">
              {program.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <Timer className="text-blue-600" size={18} />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Duration</span>
                <span className="text-sm font-bold text-slate-900">{program.durationMins} Mins</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Flame className="text-amber-500" size={18} />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Energy</span>
                <span className="text-sm font-bold text-slate-900">{program.caloriesBurn} Kcal</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Award className="text-emerald-500" size={18} />
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Level</span>
                <span className="text-sm font-bold text-slate-900">{program.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Current Exercise Spotlight & Interactive Timer */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-blue-400">
                Exercise {currentExerciseIndex + 1} of {program.exercises.length}
              </span>
              <span className="text-xs font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                {currentEx.durationOrReps}
              </span>
            </div>

            <h3 className="text-2xl font-black tracking-tight">{currentEx.name}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {currentEx.description}
            </p>

            {/* Countdown Display */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/60">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums tracking-tight font-mono text-emerald-400">
                  00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Active Interval</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isActive ? <Pause size={15} /> : <Play size={15} className="fill-white" />}
                  <span>{isActive ? 'Pause' : 'Start Interval'}</span>
                </button>
                <button
                  onClick={resetTimer}
                  title="Reset timer"
                  className="p-2.5 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Exercise Progression List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Routine Progression
            </h4>
            <div className="space-y-2">
              {program.exercises.map((ex, idx) => {
                const isCurrent = idx === currentExerciseIndex;
                const isDone = completedExercises.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentExerciseIndex(idx);
                      resetTimer();
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-50/80 border-blue-200 text-blue-950 font-semibold'
                        : 'bg-white border-slate-100 hover:border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-700'
                            : isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isDone ? <CheckCircle2 size={15} /> : idx + 1}
                      </div>
                      <span className="text-xs font-medium">{ex.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{ex.durationOrReps}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleNextExercise}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            {currentExerciseIndex === program.exercises.length - 1
              ? 'Complete Workout (+380 Kcal)'
              : 'Next Exercise →'}
          </button>
        </div>
      </div>
    </div>
  );
};
