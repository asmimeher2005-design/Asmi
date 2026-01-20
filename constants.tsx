
import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  BarChart3, 
  Sparkles, 
  UserCircle,
  Flower2,
  Moon,
  Zap,
  Coffee,
  HeartPulse,
  Droplets,
  Scissors
} from 'lucide-react';

export const COLORS = {
  primary: '#ec4899', // pink-500
  secondary: '#8b5cf6', // violet-500
  accent: '#10b981', // emerald-500
  background: '#faf9f6',
  card: '#ffffff'
};

export const SYMPTOM_METADATA = {
  acne: { label: 'Acne', icon: <Sparkles className="w-5 h-5" />, color: 'bg-rose-100' },
  bloating: { label: 'Bloating', icon: <Flower2 className="w-5 h-5" />, color: 'bg-amber-100' },
  hairGrowth: { label: 'Hair Growth', icon: <Scissors className="w-5 h-5" />, color: 'bg-indigo-100' },
  mood: { label: 'Mood', icon: <Moon className="w-5 h-5" />, color: 'bg-purple-100' },
  energy: { label: 'Energy', icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-100' },
  cravings: { label: 'Cravings', icon: <Coffee className="w-5 h-5" />, color: 'bg-orange-100' },
  pain: { label: 'Cramps/Pain', icon: <HeartPulse className="w-5 h-5" />, color: 'bg-red-100' },
};

export const PERIOD_STRENGTHS = [
  { value: 'none', label: 'No Period', color: 'bg-gray-100' },
  { value: 'light', label: 'Light', color: 'bg-pink-100' },
  { value: 'medium', label: 'Medium', color: 'bg-pink-300' },
  { value: 'heavy', label: 'Heavy', color: 'bg-pink-500' },
];
