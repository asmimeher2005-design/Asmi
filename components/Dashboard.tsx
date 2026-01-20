
import React, { useEffect, useState } from 'react';
import { DailyLog, UserProfile } from '../types';
import { getPCOSInsights } from '../services/geminiService';
import { Sparkles, Calendar, ChevronRight, Activity } from 'lucide-react';

interface DashboardProps {
  logs: DailyLog[];
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ logs, profile }) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (logs.length > 0) {
        setLoading(true);
        const data = await getPCOSInsights(logs, profile);
        setInsights(data);
        setLoading(false);
      }
    };
    fetchInsights();
  }, [logs, profile]);

  const lastLog = logs[logs.length - 1];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="pt-8 pb-6 px-6">
        <h1 className="text-2xl font-bold text-gray-800">Hello, {profile.name} ✨</h1>
        <p className="text-gray-500 text-sm">{today}</p>
      </header>

      {/* Cycle Overview */}
      <section className="px-6 mb-8">
        <div className="bg-gradient-to-br from-rose-400 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rose-100 text-xs font-semibold uppercase tracking-widest mb-1">Cycle Day</p>
              <h2 className="text-4xl font-bold">Day 14</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-xs">
              Follicular Phase
            </div>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4">
            <div className="bg-white h-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-rose-50 font-medium">
            <span>Period Start</span>
            <span>Next Period: ~14 days</span>
          </div>
        </div>
      </section>

      {/* Quick Action */}
      {!lastLog && (
        <section className="px-6 mb-8">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-xl">
                        <Activity className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-amber-900 text-sm">Log your symptoms</p>
                        <p className="text-amber-700 text-xs">You haven't checked in today yet.</p>
                    </div>
                </div>
                <ChevronRight className="text-amber-400" />
            </div>
        </section>
      )}

      {/* AI Insights */}
      <section className="px-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-gray-800">Cia's Wellness Insights</h3>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[1, 2].map((i) => (
              <div key={i} className="min-w-[280px] h-40 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : insights ? (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {insights.insights.map((insight: any, idx: number) => (
              <div key={idx} className="min-w-[280px] bg-white rounded-2xl p-5 shadow-sm border border-rose-50">
                <span className="text-[10px] font-bold uppercase text-rose-500 bg-rose-50 px-2 py-1 rounded-md">
                  {insight.category}
                </span>
                <h4 className="font-bold mt-3 text-gray-800">{insight.title}</h4>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-200 text-center">
            <p className="text-gray-400 text-sm">Log a few days of data to unlock AI-powered PCOS insights.</p>
          </div>
        )}
      </section>

      {/* Daily Routine Tips */}
      <section className="px-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            Suggested for You
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <p className="text-xs text-indigo-400 font-bold uppercase mb-1">Movement</p>
                <p className="font-bold text-indigo-900 text-sm">Gentle Pilates</p>
                <p className="text-xs text-indigo-700 mt-1">Good for cortisol</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <p className="text-xs text-emerald-400 font-bold uppercase mb-1">Nutrition</p>
                <p className="font-bold text-emerald-900 text-sm">Spearmint Tea</p>
                <p className="text-xs text-emerald-700 mt-1">Helps hirsutism</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
