/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WorkoutHeroCard } from './components/WorkoutHeroCard';
import { HydrationCard } from './components/HydrationCard';
import { SleepCard } from './components/SleepCard';
import { CaloriesCard } from './components/CaloriesCard';
import { WeightCard } from './components/WeightCard';
import { WorkoutModal } from './components/modals/WorkoutModal';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { LogModal } from './components/modals/LogModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { InfoModal } from './components/modals/InfoModal';
import { ActivityView } from './components/views/ActivityView';
import { CommunityView } from './components/views/CommunityView';
import { CalendarView } from './components/views/CalendarView';
import { SettingsView } from './components/views/SettingsView';
import {
  initialCalorieData,
  initialHydrationData,
  initialSleepInsights,
  initialWeightData,
} from './data/mockData';
import { TabType, TimeRange } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [userName, setUserName] = useState('Andreas');
  
  // Dashboard state
  const [hydrationData, setHydrationData] = useState(initialHydrationData);
  const [calorieData, setCalorieData] = useState(initialCalorieData);
  const [weightData, setWeightData] = useState(initialWeightData);
  const [sleepInsights] = useState(initialSleepInsights);

  // Modals state
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Handlers for Hydration
  const handleUpdateGlasses = (count: number) => {
    const clampedCount = Math.max(0, Math.min(hydrationData.totalGlasses, count));
    const calculatedLitres = Number(((clampedCount / hydrationData.totalGlasses) * hydrationData.targetLitres).toFixed(2));
    setHydrationData((prev) => ({
      ...prev,
      glassesDrank: clampedCount,
      dailyLitres: calculatedLitres,
    }));
  };

  const handleUpdateTimeRange = (timeRange: TimeRange) => {
    setHydrationData((prev) => ({ ...prev, timeRange }));
  };

  // Handlers for Calories & Workout
  const handleCompleteWorkout = (burnedCalories: number) => {
    setCalorieData((prev) => {
      const newConsumed = Math.min(prev.target + 500, prev.consumed + burnedCalories);
      return {
        ...prev,
        consumed: newConsumed,
        status: newConsumed >= prev.target ? 'Target achieved!' : 'High metabolic activity',
      };
    });
  };

  const handleLogCalories = (cals: number, carbs: number, protein: number, fat: number) => {
    setCalorieData((prev) => ({
      ...prev,
      consumed: prev.consumed + cals,
      macros: {
        carbs: prev.macros.carbs + carbs,
        protein: prev.macros.protein + protein,
        fats: prev.macros.fats + fat,
      },
    }));
  };

  // Handlers for Water Log Modal
  const handleLogWater = (amountL: number) => {
    setHydrationData((prev) => {
      const newL = Number((prev.dailyLitres + amountL).toFixed(2));
      const newGlasses = Math.min(
        prev.totalGlasses,
        Math.round((newL / prev.targetLitres) * prev.totalGlasses)
      );
      return {
        ...prev,
        dailyLitres: newL,
        glassesDrank: newGlasses,
      };
    });
  };

  // Handlers for Weight
  const handleUpdateWeight = (newKg: number) => {
    setWeightData((prev) => ({
      ...prev,
      currentKg: newKg,
    }));
  };

  // Search routing
  const handleSearchSelect = (action: string) => {
    if (action === 'workout') {
      setIsWorkoutModalOpen(true);
    } else if (action === 'hydration' || action === 'calories' || action === 'weight') {
      setIsLogModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#ebf4fa] text-slate-900 flex flex-row font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenInfo={() => setIsInfoModalOpen(true)}
      />

      {/* 2. Main Workspace Viewport */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col flex-1 pb-10">
          {/* Header Bar */}
          <Header
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
            onOpenQuickLog={() => setIsLogModalOpen(true)}
            onSearchSelect={handleSearchSelect}
          />

          {/* Conditional View Routing */}
          {currentTab === 'home' && (
            <div className="space-y-6 flex-1">
              {/* Row 1: Workout Hero Banner (Left 58%) & Hydration Status (Right 42%) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-7 xl:col-span-7">
                  <WorkoutHeroCard
                    onStartTrial={() => setIsWorkoutModalOpen(true)}
                    onExploreNow={() => setIsWorkoutModalOpen(true)}
                  />
                </div>
                <div className="lg:col-span-5 xl:col-span-5">
                  <HydrationCard
                    data={hydrationData}
                    onUpdateGlasses={handleUpdateGlasses}
                    onUpdateTimeRange={handleUpdateTimeRange}
                  />
                </div>
              </div>

              {/* Row 2: Deep Sleep (Left), Calories (Center), Weight (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {/* 1. Deep Sleep Card */}
                <div>
                  <SleepCard insights={sleepInsights} />
                </div>

                {/* 2. Calories Card */}
                <div>
                  <CaloriesCard
                    data={calorieData}
                    onLogMeal={() => setIsLogModalOpen(true)}
                  />
                </div>

                {/* 3. Weight Card */}
                <div className="md:col-span-2 lg:col-span-1">
                  <WeightCard
                    data={weightData}
                    onUpdateWeight={handleUpdateWeight}
                  />
                </div>
              </div>
            </div>
          )}

          {currentTab === 'activity' && <ActivityView />}
          {currentTab === 'messages' && <CommunityView />}
          {currentTab === 'calendar' && <CalendarView />}
          {currentTab === 'settings' && <SettingsView />}
          {currentTab === 'notifications' && (
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-4 max-w-xl">
              <h2 className="text-2xl font-black text-slate-900">Notifications & Alerts</h2>
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs space-y-1 font-medium">
                <span className="font-bold block">Hydration Goal: 75% reached</span>
                <span>You&apos;ve logged 21 glasses today. Keep drinking to hit your 2.80L target!</span>
              </div>
              <div className="p-4 bg-blue-50 text-blue-800 rounded-2xl text-xs space-y-1 font-medium">
                <span className="font-bold block">Workout Recommendation</span>
                <span>Home workout pushup progression is scheduled for this afternoon.</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Interactive Modals */}
      <WorkoutModal
        isOpen={isWorkoutModalOpen}
        onClose={() => setIsWorkoutModalOpen(false)}
        onCompleteWorkout={handleCompleteWorkout}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      <LogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onLogWater={handleLogWater}
        onLogCalories={handleLogCalories}
        onLogWeight={handleUpdateWeight}
        currentWeight={weightData.currentKg}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userName={userName}
        onUpdateUserName={setUserName}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}
