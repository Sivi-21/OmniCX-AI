import React from 'react';
import { Activity } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlusCircle, 
  RefreshCw, 
  Send, 
  AlertTriangle, 
  Clock,
  User,
  Zap,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'ticket_created': return <PlusCircle className="w-4 h-4 text-emerald-500" />;
      case 'ticket_updated': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'reply_sent': return <Send className="w-4 h-4 text-indigo-500" />;
      case 'sla_breach': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
          <Zap className="w-3 h-3 text-indigo-500" /> Live Intelligence
        </h3>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
          <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide pr-2">
        <AnimatePresence initial={false}>
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800">
                <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Waiting for signals...</p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm z-10 group-hover:border-indigo-500/30 transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/5">
                      {getIcon(activity.type)}
                    </div>
                    {index !== activities.length - 1 && (
                      <div className="w-px flex-1 bg-slate-100 dark:bg-slate-800 my-3"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-black text-slate-800 dark:text-slate-200 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {activity.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {activity.user && (
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          <User className="w-3 h-3" />
                          {activity.user}
                        </div>
                      )}
                      {activity.ticketId && (
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-500/20">
                          {activity.ticketId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <button className="w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30">
          <CheckCircle2 className="w-4 h-4" /> Mark all as read
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
