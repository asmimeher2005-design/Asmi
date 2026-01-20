
import React, { useState } from 'react';
import { DailyLog, SymptomLevel } from '../types';
import { SYMPTOM_METADATA, PERIOD_STRENGTHS } from '../constants';
import { Check, X, Save } from 'lucide-react';

interface LogFormProps {
  onSave: (log: DailyLog) => void;
  onClose: () => void;
}

const LogForm: React.FC<LogFormProps> = ({ onSave, onClose }) => {
  const [period, setPeriod] = useState<'none' | 'light' | 'medium' | 'heavy'>('none');
  const [symptoms, setSymptoms] = useState<Record<string, SymptomLevel>>({
    acne: 0,
    bloating: 0,
    hairGrowth: 0,
    mood: 0,
    energy: 0,
    cravings: 0,
    pain: 0,
  });
  const [notes, setNotes] = useState('');

  const handleSymptomClick = (symptom: string) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: ((prev[symptom] + 1) % 4) as SymptomLevel
    }));
  };

  const handleSubmit = () => {
    const log: DailyLog = {
      date: new Date().toISOString().split('T')[0],
      period,
      symptoms: symptoms as DailyLog['symptoms'],
      notes
    };
    onSave(log);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto pb-10">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-rose-50">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <h2 className="font-bold text-lg">Log Symptoms</h2>
        <button 
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-4 py-1.5 rounded-full font-bold text-sm flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </header>

      <div className="p-6 space-y-8">
        {/* Period Strength */}
        <section>
          <h3 className="font-bold text-gray-800 mb-4">Period Status</h3>
          <div className="grid grid-cols-4 gap-2">
            {PERIOD_STRENGTHS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value as any)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 transition-all ${
                  period === p.value 
                  ? 'border-rose-500 bg-rose-50' 
                  : 'border-transparent bg-gray-50 text-gray-500'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                <span className="text-[10px] font-bold uppercase">{p.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Symptoms Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Symptoms</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tap to cycle intensity</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(SYMPTOM_METADATA).map(([key, meta]) => {
              const level = symptoms[key];
              return (
                <button
                  key={key}
                  onClick={() => handleSymptomClick(key)}
                  className={`relative p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${
                    level > 0 
                    ? 'border-rose-300 bg-white shadow-md' 
                    : 'border-transparent bg-gray-50 opacity-60'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${meta.color} ${level > 0 ? 'scale-110' : ''} transition-transform`}>
                    {meta.icon}
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">{meta.label}</span>
                  {level > 0 && (
                    <div className="absolute top-2 right-2 flex gap-0.5">
                      {[...Array(level)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Notes */}
        <section>
          <h3 className="font-bold text-gray-800 mb-3">Personal Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling mentally or physically today?"
            className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-rose-200 transition-all min-h-[120px]"
          />
        </section>
      </div>
    </div>
  );
};

export default LogForm;
