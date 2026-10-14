import { CalorieData, HydrationData, SleepInsight, WeightData, WorkoutProgram } from '../types';

export const initialSleepInsights: SleepInsight[] = [
  {
    id: 1,
    title: 'Optimizing Circadian Rhythm',
    badge: 'Circadian Light',
    description: 'Morning natural sunlight exposure halts melatonin release and sets your master clock for deeper nighttime delta waves.',
    duration: '8h 15m avg',
  },
  {
    id: 2,
    title: 'Experience the Goodness of Deep Sleep',
    badge: 'Deep sleep',
    description: 'Discover tips and techniques for better, deeper sleep. Wake up refreshed and experience the true benefits of restful nights.',
    duration: '7h 45m avg',
  },
  {
    id: 3,
    title: 'Pre-Sleep Temperature Cooling',
    badge: 'Thermoregulation',
    description: 'Lowering bedroom temperature to 18-20°C signals your core body temperature to drop, accelerating time to sleep onset.',
    duration: '94% rest efficiency',
  },
  {
    id: 4,
    title: 'Magnesium & Glycine Nutrient Synergy',
    badge: 'Restful Nutrition',
    description: 'Taking magnesium glycinate 60 minutes before bed enhances GABA neuroreceptors and relaxes neuromuscular tension.',
    duration: 'Deep stage +24%',
  },
  {
    id: 5,
    title: 'Digital Sunsets & Melatonin Shield',
    badge: 'Blue Light Shield',
    description: 'Switching off high-intensity LED displays 90 minutes before sleep prevents dopamine stimulation and preserves melatonin.',
    duration: 'REM stage +18%',
  },
];

// 36 bars for calorie distribution throughout the waking hours
export const generateHourlyBars = () => {
  const bars = [];
  const basePattern = [
    0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 0.95, 0.85, 0.7, 0.75, 
    0.8, 0.85, 0.9, 0.92, 0.88, 0.84, 0.89, 0.93, 0.98, 0.92, 
    0.85, 0.8, 0.85, 0.9, 0.95, 0.92, 0.88, 0.85, 0.82, 0.8, 
    0.78, 0.75, 0.7, 0.65, 0.6, 0.55
  ];
  for (let i = 0; i < 36; i++) {
    const val = Math.round(basePattern[i] * 65);
    bars.push({
      hour: `${Math.floor(i / 1.5) + 6}:00`,
      value: val,
    });
  }
  return bars;
};

export const initialCalorieData: CalorieData = {
  consumed: 2040,
  target: 2350,
  status: 'Lack of physical activity',
  macros: {
    carbs: 269,
    protein: 164,
    fats: 110,
  },
  hourlyBars: generateHourlyBars(),
};

export const initialWeightData: WeightData = {
  currentKg: 82,
  heightCm: 188,
  healthyMin: 68,
  healthyMax: 84,
  bodyType: 'Tall body',
  completionText: 'Of the weekly plan completed',
  motivationalText: 'Keep it up!',
  history: [
    { day: 'Mon', weight: 83.2 },
    { day: 'Tue', weight: 82.8 },
    { day: 'Wed', weight: 82.6 },
    { day: 'Thu', weight: 82.3 },
    { day: 'Fri', weight: 82.1 },
    { day: 'Sat', weight: 82.0 },
    { day: 'Sun', weight: 82.0 },
  ],
};

export const initialHydrationData: HydrationData = {
  dailyLitres: 2.15,
  targetLitres: 2.8,
  glassesDrank: 21,
  totalGlasses: 28, // 4 rows x 7 columns
  statusText: 'Drive your goal water daily. Build healthy habits and achieve your focus.',
  timeRange: 'D',
};

export const featuredWorkoutProgram: WorkoutProgram = {
  title: 'Your Home Workout Starts Here!',
  subtitle: 'High-intensity athletic conditioning built for speed, lean muscle, and functional agility at home.',
  membersCount: '5.8K+',
  durationMins: 28,
  caloriesBurn: 380,
  difficulty: 'Intermediate',
  exercises: [
    {
      name: 'Dynamic Box Step & Dip',
      durationOrReps: '3 sets × 12 reps',
      description: 'Stabilize core on elevated box edge, descend slowly to 90 degrees elbow bend, power upward.',
    },
    {
      name: 'Explosive Push-Up Progression',
      durationOrReps: '4 sets × 10 reps',
      description: 'Controlled chest dip with rapid kinetic drive to engage pectoralis and anterior deltoids.',
    },
    {
      name: 'Isometric Plank Hold',
      durationOrReps: '3 sets × 45 secs',
      description: 'Maintain neutral spine alignment while drawing navel toward lumbar vertebrae.',
    },
    {
      name: 'Lateral Mountain Climbers',
      durationOrReps: '3 sets × 30 secs',
      description: 'High-tempo alternating knee-to-elbow drive for cardiovascular conditioning.',
    },
  ],
};
