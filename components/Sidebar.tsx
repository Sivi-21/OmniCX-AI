
import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  Layers,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'form', label: 'New Request', icon: PlusCircle },
    { id: 'analytics', label: 'Intelligence', icon: BarChart3 },
    { id: 'customers', label: 'Customer 360', icon: Users },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-colors z-30">
      <div className="h-24 flex items-center px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 dark:shadow-none border border-indigo-500">
            <Zap className="text-white w-7 h-7 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">OmniCX <span className="text-indigo-600">AI</span></h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Enterprise</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 p-6 space-y-8 overflow-y-auto scrollbar-hide">
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6 px-4">Main Navigation</p>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group relative ${
                  currentView === item.id
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-indigo-600'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`} />
                {item.label}
                {currentView === item.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                )}
                {item.id === 'dashboard' && currentView !== item.id && (
                  <span className="ml-auto text-[10px] bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-2 py-0.5 rounded-lg font-black">12</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-6 px-4">System Control</p>
          <div className="space-y-2">
            <button 
              onClick={() => onViewChange('analytics')}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
            >
              <Shield className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
              Security Audit
            </button>
            <button 
              onClick={() => onViewChange('settings')}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
            >
              <Settings className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
              Settings
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6 border-t border-slate-100 dark:border-slate-800">
        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 mb-6 group cursor-pointer hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">AI Capacity</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">85% Efficiency</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
            />
          </div>
        </div>
        
        <button 
          onClick={() => onViewChange('landing')}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
