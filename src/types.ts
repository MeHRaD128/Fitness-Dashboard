export type TabType = 'home' | 'activity' | 'messages' | 'calendar' | 'notifications' | 'settings';

export type TimeRange = 'D' | 'W' | 'M';

export interface SleepInsight {
  id: number;
  title: string;
  badge: string;
  description: string;
  duration: string;
  audioTrack?: string;
}

export interface MacroBreakdown {
  carbs: number; // in grams
  protein: number; // in grams
  fats: number; // in grams
}

export interface CalorieData {
  consumed: number;
  target: number;
  status: string;
  macros: MacroBreakdown;
  hourlyBars: { hour: string; value: number }[];
}

export interface WeightData {
  currentKg: number;
  heightCm: number;
  healthyMin: number;
  healthyMax: number;
  bodyType: string;
  completionText: string;
  motivationalText: string;
  history: { day: string; weight: number }[];
}

export interface HydrationData {
  dailyLitres: number;
  targetLitres: number;
  glassesDrank: number;
  totalGlasses: number;
  statusText: string;
  timeRange: TimeRange;
}

export interface WorkoutProgram {
  title: string;
  subtitle: string;
  membersCount: string;
  durationMins: number;
  caloriesBurn: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: {
    name: string;
    durationOrReps: string;
    description: string;
  }[];
}
