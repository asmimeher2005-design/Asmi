
import React from 'react';
import { DailyLog } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface TrendsProps {
  logs: DailyLog[];
}

const Trends: React.FC<TrendsProps> = ({ logs }) => {
  // Mock data if logs are empty
  const chartData = logs.length > 0 ? logs.map(l => ({
    date: l.date.split('-').slice(1).join('/'),
    energy: l.symptoms.energy,
    bloating: l.symptoms.bloating,
    mood: l.symptoms.mood,
    pain: l.symptoms.pain,
  })) : [
    { date: '01/01', energy: 1, bloating: 2, mood: 1, pain: 0 },
    { date: '01/02', energy: 2, bloating: 1, mood: 2, pain: 1 },
    { date: '01/03', energy: 3, bloating: 0, mood: 3, pain: 0 },
  ];

  return (
    <div className="px-6 py-8 pb-24 space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
        <p className="text-gray-500 text-sm">Reviewing your patterns over time</p>
      </header>

      {/* Primary Chart */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50">
        <h3 className="font-bold text-gray-800 mb-6 flex justify-between items-center">
            Symptom Intensity
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last 7 Logs</span>
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9ca3af'}} 
                dy={10}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke="#ec4899" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorMood)" 
              />
              <Area 
                type="monotone" 
                dataKey="energy" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorEnergy)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Mood</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Energy</span>
            </div>
        </div>
      </section>

      {/* Breakdown */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-rose-50">
        <h3 className="font-bold text-gray-800 mb-6">Frequency Comparison</h3>
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="date" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="bloating" fill="#fbbf24" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="pain" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </section>
      
      {logs.length === 0 && (
          <div className="text-center p-8 bg-rose-50 rounded-3xl border border-rose-100">
              <p className="text-rose-600 font-bold mb-1">More data needed!</p>
              <p className="text-rose-400 text-xs">Keep logging daily to see accurate hormonal trends.</p>
          </div>
      )}
    </div>
  );
};

export default Trends;
