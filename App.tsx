
import React, { useState, useEffect } from 'react';
import { View, DailyLog, UserProfile } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import LogForm from './components/LogForm';
import Trends from './components/Trends';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('dashboard');
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [profile] = useState<UserProfile>({
    name: 'Sarah',
    cycleLength: 32,
    periodLength: 5,
    goals: ['Reduce inflammation', 'Balance energy', 'Skin health']
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('cia_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSaveLog = (newLog: DailyLog) => {
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem('cia_logs', JSON.stringify(updatedLogs));
    setView('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard logs={logs} profile={profile} />;
      case 'log':
        return <LogForm onSave={handleSaveLog} onClose={() => setView('dashboard')} />;
      case 'trends':
        return <Trends logs={logs} />;
      case 'assistant':
        return <Assistant logs={logs} />;
      case 'profile':
        return (
          <div className="p-8 text-center">
            <div className="w-24 h-24 bg-rose-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🧘‍♀️</span>
            </div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-500 mb-6 text-sm">Managing PCOS since 2023</p>
            <div className="space-y-3 text-left">
                <div className="bg-white p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">My Goals</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile.goals.map(g => <span key={g} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-medium">{g}</span>)}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <span className="text-sm font-medium">Cycle Length</span>
                    <span className="text-sm font-bold text-rose-500">{profile.cycleLength} Days</span>
                </div>
            </div>
          </div>
        );
      default:
        return <Dashboard logs={logs} profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 max-w-md mx-auto relative shadow-2xl overflow-x-hidden flex flex-col">
      <main className="flex-1">
        {renderView()}
      </main>
      
      {currentView !== 'log' && (
        <Navigation currentView={currentView} setView={setView} />
      )}
    </div>
  );
};

export default App;
