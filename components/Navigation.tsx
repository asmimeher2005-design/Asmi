
import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  Sparkles, 
  UserCircle 
} from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'trends', icon: BarChart3, label: 'Trends' },
    { id: 'log', icon: PlusCircle, label: 'Log', special: true },
    { id: 'assistant', icon: Sparkles, label: 'Cia AI' },
    { id: 'profile', icon: UserCircle, label: 'Me' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-rose-100 px-4 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        if (item.special) {
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className="flex flex-col items-center -mt-8"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isActive ? 'bg-rose-600' : 'bg-rose-500'}`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-[10px] font-medium mt-1 text-rose-500 uppercase tracking-wider">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-rose-600' : 'text-gray-400'}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
