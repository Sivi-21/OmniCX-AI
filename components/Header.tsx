
import React from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Bell, Search, Plus, Command, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNewTicket: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTicket, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="h-24 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-40 sticky top-0 transition-colors">
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-xl group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search intelligence, customers, or KB..."
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 transition-all outline-none dark:text-slate-200 placeholder:text-slate-400"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] font-black text-slate-400 shadow-sm">
            <Command className="w-3 h-3" /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </motion.button>
          
          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </motion.button>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewTicket}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-indigo-500/20 dark:shadow-none transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Request</span>
        </motion.button>

        <div className="flex items-center gap-4 ml-2 pl-6 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">SIVAGAMI R</p>
            <div className="flex items-center justify-end gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senior Lead</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/20 border-2 border-white dark:border-slate-800">
            SR
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
