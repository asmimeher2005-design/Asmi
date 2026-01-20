
export type SymptomLevel = 0 | 1 | 2 | 3; // None, Mild, Moderate, Severe

export interface DailyLog {
  date: string; // ISO string YYYY-MM-DD
  symptoms: {
    acne: SymptomLevel;
    bloating: SymptomLevel;
    hairGrowth: SymptomLevel; // Hirsutism
    mood: SymptomLevel;
    energy: SymptomLevel;
    cravings: SymptomLevel;
    pain: SymptomLevel;
  };
  period: 'none' | 'light' | 'medium' | 'heavy';
  weight?: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  cycleLength: number;
  periodLength: number;
  goals: string[];
}

export type View = 'dashboard' | 'log' | 'trends' | 'assistant' | 'profile';
