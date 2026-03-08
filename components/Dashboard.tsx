
import React, { useState, useMemo } from 'react';
import { Ticket, Channel, Priority, Status, Sentiment } from '../types';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  BarChart3, 
  Hourglass, 
  AlertCircle, 
  Trophy,
  Mail,
  MessageSquare,
  Globe,
  Twitter,
  HelpCircle,
  Smile,
  Meh,
  Frown,
  Angry,
  CheckCircle2,
  Clock,
  RefreshCw,
  Zap,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

interface DashboardProps {
  tickets: Ticket[];
  onTicketClick: (id: string) => void;
  onAddRequest: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tickets, onTicketClick, onAddRequest }) => {
  const [filter, setFilter] = useState({
    status: 'All',
    priority: 'All',
    channel: 'All'
  });

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const statusMatch = filter.status === 'All' || t.status === filter.status;
      const priorityMatch = filter.priority === 'All' || t.priority === filter.priority;
      const channelMatch = filter.channel === 'All' || t.channel === filter.channel;
      return statusMatch && priorityMatch && channelMatch;
    });
  }, [tickets, filter]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === Status.OPEN).length,
    urgent: tickets.filter(t => t.priority === Priority.URGENT).length,
    resolved: tickets.filter(t => t.status === Status.RESOLVED).length
  }), [tickets]);

  return (
    <div className="space-y-8 pb-12 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Command Center</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Unifying {filteredTickets.length} streams across the enterprise</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search intelligence..."
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-slate-200"
            />
          </div>
          <select 
            value={filter.status}
            onChange={(e) => setFilter({...filter, status: e.target.value})}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option>All Status</option>
            {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button 
            onClick={() => setFilter({ status: 'All', priority: 'All', channel: 'All' })}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            title="Reset Filters"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Live Volume" 
          value={stats.total} 
          icon={BarChart3} 
          color="blue" 
          trend="+12%" 
          onClick={() => setFilter({ ...filter, status: 'All', priority: 'All' })}
        />
        <StatCard 
          label="Active Queue" 
          value={stats.open} 
          icon={Hourglass} 
          color="orange" 
          trend="-5%" 
          onClick={() => setFilter({ ...filter, status: Status.OPEN })}
        />
        <StatCard 
          label="SLA Breaches" 
          value={stats.urgent} 
          icon={AlertCircle} 
          color="red" 
          trend="+2" 
          onClick={() => setFilter({ ...filter, priority: Priority.URGENT })}
        />
        <StatCard 
          label="Success Rate" 
          value={`${Math.round((stats.resolved / (stats.total || 1)) * 100)}%`} 
          icon={Trophy} 
          color="green" 
          trend="+4%" 
          onClick={() => setFilter({ ...filter, status: Status.RESOLVED })}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors"
      >
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-8 py-6">SLA / Status</th>
                <th className="px-8 py-6">Ticket Insight</th>
                <th className="px-8 py-6">Source</th>
                <th className="px-8 py-6">Sentiment</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredTickets.map((ticket, idx) => (
                <motion.tr 
                  key={ticket.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 cursor-pointer transition-all group"
                  onClick={() => onTicketClick(ticket.id)}
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      <StatusBadge status={ticket.status} />
                      <SLABadge deadline={ticket.slaDeadline} priority={ticket.priority} status={ticket.status} />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="max-w-xs">
                      <p className="text-sm font-black text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{ticket.subject}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <PriorityBadge priority={ticket.priority} />
                        <div className="flex gap-1">
                          {ticket.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter border border-slate-200 dark:border-slate-700">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                        <ChannelIcon channel={ticket.channel} />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{ticket.channel}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <SentimentIcon sentiment={ticket.sentiment} />
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-[10px]">
                        {ticket.customerName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 leading-none mb-1">{ticket.customerName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{ticket.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-all flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number | string; icon: any; color: string; trend: string; onClick?: () => void }> = ({ label, value, icon: Icon, color, trend, onClick }) => {
  const colorMap: Record<string, string> = {
    blue: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20',
    orange: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20',
    red: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20',
    green: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]} border transition-transform group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
          <ArrowUpRight className="w-3 h-3" /> {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
      </div>
    </motion.div>
  );
};

export const SLABadge: React.FC<{ deadline: string; priority: Priority; status: Status }> = ({ deadline, priority, status }) => {
  if (status === Status.RESOLVED) return <span className="text-[9px] text-emerald-600 font-black uppercase flex items-center gap-1 tracking-widest"><CheckCircle2 className="w-3 h-3" /> SLA Met</span>;
  
  const now = new Date();
  const target = new Date(deadline);
  const diff = target.getTime() - now.getTime();
  const isBreaching = diff < 3600000; // Less than 1 hour

  if (diff < 0) return <span className="text-[9px] text-rose-600 font-black uppercase animate-pulse flex items-center gap-1 tracking-widest"><AlertCircle className="w-3 h-3" /> Breached</span>;
  
  return (
    <span className={`text-[9px] font-black uppercase flex items-center gap-1 tracking-widest ${isBreaching ? 'text-amber-600' : 'text-slate-400 dark:text-slate-500'}`}>
      <Clock className="w-3 h-3" />
      {Math.max(0, Math.floor(diff / 3600000))}h left
    </span>
  );
};

export const SentimentIcon: React.FC<{ sentiment?: Sentiment }> = ({ sentiment }) => {
  const map = {
    'Positive': { icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    'Neutral': { icon: Meh, color: 'text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800' },
    'Frustrated': { icon: Frown, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    'Critical': { icon: Angry, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  };
  
  const current = sentiment ? map[sentiment] : map['Neutral'];
  const Icon = current.icon;
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${current.bg} border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform`}>
      <Icon className={`w-4 h-4 ${current.color}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${current.color}`}>{sentiment || 'Analysing...'}</span>
    </div>
  );
};

export const ChannelIcon: React.FC<{ channel: Channel }> = ({ channel }) => {
  switch (channel) {
    case Channel.EMAIL: return <Mail className="w-4 h-4 text-blue-500" />;
    case Channel.CHAT: return <MessageSquare className="w-4 h-4 text-emerald-500" />;
    case Channel.WEB_FORM: return <Globe className="w-4 h-4 text-indigo-500" />;
    case Channel.TWITTER: return <Twitter className="w-4 h-4 text-sky-400" />;
    default: return <HelpCircle className="w-4 h-4 text-slate-300" />;
  }
};

export const PriorityBadge: React.FC<{ priority: Priority }> = ({ priority }) => {
  const styles = {
    [Priority.LOW]: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    [Priority.MEDIUM]: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20',
    [Priority.HIGH]: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20',
    [Priority.URGENT]: 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/30 animate-pulse',
  };
  return <span className={`text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-lg border shadow-sm ${styles[priority]}`}>{priority}</span>;
};

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const styles = {
    [Status.OPEN]: 'bg-indigo-600 text-white shadow-indigo-500/20 dark:shadow-none',
    [Status.IN_PROGRESS]: 'bg-amber-500 text-white shadow-amber-500/20 dark:shadow-none',
    [Status.RESOLVED]: 'bg-emerald-500 text-white shadow-emerald-500/20 dark:shadow-none',
  };
  return (
    <span className={`inline-flex items-center text-[10px] font-black px-3 py-1 rounded-xl shadow-lg uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Dashboard;
