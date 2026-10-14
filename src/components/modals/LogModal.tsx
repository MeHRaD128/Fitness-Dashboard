import React, { useState } from 'react';
import { X, Droplets, Flame, Scale, Moon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/audio';

interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogWater: (amountL: number) => void;
  onLogCalories: (calories: number, carbs: number, protein: number, fat: number) => void;
  onLogWeight: (kg: number) => void;
  currentWeight: number;
}

export const LogModal: React.FC<LogModalProps> = ({
  isOpen,
  onClose,
  onLogWater,
  onLogCalories,
  onLogWeight,
  currentWeight,
}) => {
  const [activeTab, setActiveTab] = useState<'water' | 'food' | 'weight' | 'sleep'>('water');
  const [waterCups, setWaterCups] = useState(1);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState(350);
  const [carbs, setCarbs] = useState(40);
  const [protein, setProtein] = useState(25);
  const [fats, setFats] = useState(12);
  const [newWeight, setNewWeight] = useState(currentWeight);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  const handleWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playWaterChime();
    const litres = waterCups * 0.25;
    onLogWater(litres);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    showSuccess(`Logged ${(waterCups * 250)} ml of fresh water!`);
  };

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playBeep(520, 0.15);
    onLogCalories(Number(calories), Number(carbs), Number(protein), Number(fats));
    showSuccess(`Logged ${calories} Kcal for ${foodName || 'Meal'}!`);
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playBeep(600, 0.15);
    onLogWeight(Number(newWeight));
    showSuccess(`Updated body weight to ${newWeight} kg!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900">Log Daily Activity</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-100/70 mx-6 mt-4 rounded-2xl">
          <button
            onClick={() => setActiveTab('water')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'water' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Droplets size={14} />
            <span>Water</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'food' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Flame size={14} />
            <span>Food / Kcal</span>
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'weight' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Scale size={14} />
            <span>Weight</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {successMessage ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Check size={24} strokeWidth={3} />
              </div>
              <p className="text-sm font-bold text-slate-900">{successMessage}</p>
            </div>
          ) : activeTab === 'water' ? (
            <form onSubmit={handleWaterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">
                  Glasses of Water (250 ml each)
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setWaterCups(n)}
                      className={`flex-1 py-3 rounded-2xl font-black text-sm border transition-all cursor-pointer ${
                        waterCups === n
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {n} {n === 1 ? 'Cup' : 'Cups'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-xs text-blue-800 flex items-center justify-between font-medium">
                <span>Total volume:</span>
                <span className="font-bold">{(waterCups * 0.25).toFixed(2)} Litres</span>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs shadow-md cursor-pointer transition-colors"
              >
                Confirm Water Intake
              </button>
            </form>
          ) : activeTab === 'food' ? (
            <form onSubmit={handleFoodSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Meal or Food Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Grilled Chicken Salad"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Calories (Kcal)
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(Number(e.target.value))}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-full text-xs shadow-md cursor-pointer transition-colors"
              >
                Log Meal & Calories
              </button>
            </form>
          ) : (
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">
                  Today&apos;s Body Weight (kg)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-4 py-3 text-lg font-black text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-900 text-center tabular-nums"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 flex justify-between">
                <span>Healthy reference range:</span>
                <span className="font-bold text-slate-900">68 Kg - 84 Kg</span>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-xs shadow-md cursor-pointer transition-colors"
              >
                Save Weight Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
