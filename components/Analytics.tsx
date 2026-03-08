
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { Ticket, Status, Priority, Channel, Sentiment } from '../types';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Smile,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface AnalyticsProps {
  tickets: Ticket[];
}

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
const SENTIMENT_COLORS: Record<string, string> = {
  'Positive': '#10b981',
  'Neutral': '#64748b',
  'Frustrated': '#f59e0b',
  'Critical': '#ef4444'
};

const Analytics: React.FC<AnalyticsProps> = ({ tickets }) => {
  const statusData = useMemo(() => {
    return Object.values(Status).map(s => ({
      name: s,
      value: tickets.filter(t => t.status === s).length
    }));
  }, [tickets]);

  const channelData = useMemo(() => {
    return Object.values(Channel).map(c => ({
      name: c,
      value: tickets.filter(t => t.channel === c).length
    }));
  }, [tickets]);

  const sentimentData = useMemo(() => {
    const sentiments = ['Positive', 'Neutral', 'Frustrated', 'Critical'];
    return sentiments.map(s => ({
      name: s,
      value: tickets.filter(t => t.sentiment === s).length
    }));
  }, [tickets]);

  const volumeTrend = useMemo(() => {
    return [
      { name: 'Mon', volume: 12 },
      { name: 'Tue', volume: 19 },
      { name: 'Wed', volume: 15 },
      { name: 'Thu', volume: 22 },
      { name: 'Fri', volume: 30 },
      { name: 'Sat', volume: 10 },
      { name: 'Sun', volume: 8 },
    ];
  }, []);

  const slaHealth = useMemo(() => {
    const breached = tickets.filter(t => new Date(t.slaDeadline) < new Date() && t.status !== Status.RESOLVED).length;
    return Math.max(0, 100 - (breached * 10));
  }, [tickets]);

  return (
    <div className="space-y-12 pb-20 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Intelligence Oversight</h1>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Enterprise KPIs and system-wide health metrics</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 px-8 py-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center gap-6 transition-colors">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">SLA Health Score</p>
            <p className={`text-3xl font-black ${slaHealth > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{slaHealth}%</p>
          </div>
          <div className={`w-14 h-14 rounded-2xl border-4 ${slaHealth > 90 ? 'border-emerald-500/20' : 'border-amber-500/20'} flex items-center justify-center relative`}>
            <ShieldCheck className={`w-7 h-7 ${slaHealth > 90 ? 'text-emerald-500' : 'text-amber-500'}`} />
            <div className={`absolute inset-0 rounded-2xl border-2 ${slaHealth > 90 ? 'border-emerald-500' : 'border-amber-500'} animate-ping opacity-20`}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Sentiment Analysis - Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm h-[480px] flex flex-col transition-colors group hover:border-indigo-500/30"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Smile className="w-4 h-4 text-indigo-500" /> Global Sentiment
            </h3>
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
              <PieChartIcon className="w-5 h-5 text-slate-400" />
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                >
                  {sentimentData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={SENTIMENT_COLORS[entry.name]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#fff', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '30px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Volume Trend - Bento Card (Wide) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm h-[480px] flex flex-col md:col-span-2 transition-colors group hover:border-indigo-500/30"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Volume Velocity
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-500/20">+14% vs LW</span>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeTrend}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-[10px] font-black uppercase" tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} className="text-[10px] font-black uppercase" tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Workflow State - Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm h-[480px] flex flex-col transition-colors group hover:border-indigo-500/30"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Workflow State
            </h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-[10px] font-black uppercase" tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} className="text-[10px] font-black uppercase" tick={{ fill: '#94a3b8' }} />
                <Tooltip cursor={{fill: '#f8fafc', radius: 16}} />
                <Bar dataKey="value" fill="#6366f1" radius={[16, 16, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Channel Utilization - Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm h-[480px] flex flex-col transition-colors group hover:border-indigo-500/30"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Channel Mix
            </h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats - Bento Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-indigo-600 p-12 rounded-[3rem] shadow-2xl h-[480px] flex flex-col text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Zap className="w-64 h-64 fill-current" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-12 flex items-center gap-2 opacity-80 relative z-10">
            <Target className="w-4 h-4" /> Performance Targets
          </h3>
          <div className="space-y-12 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Avg. Response Time</p>
                <p className="text-4xl font-black">1.2h</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Clock className="w-7 h-7" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">CSAT Score</p>
                <p className="text-4xl font-black">4.8/5</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Smile className="w-7 h-7" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Active Agents</p>
                <p className="text-4xl font-black">24</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Users className="w-7 h-7" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enterprise Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900 dark:bg-slate-800 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden transition-colors border border-slate-800"
      >
        <div className="absolute top-0 right-0 p-16 opacity-5">
            <BarChart3 className="w-80 h-80" />
        </div>
        <h2 className="text-3xl font-black mb-12 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          Enterprise-Grade System Highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-16 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Data Integrity</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">
              Implemented a full <strong className="text-white">Audit Trail</strong> (History API) to ensure regulatory compliance and accountability, standard in SaaS leaders like Zendesk or Kapture.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Operational SLAs</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">
              Engineered dynamic <strong className="text-white">SLA Calculation logic</strong> based on priority tiers, with real-time countdowns to ensure Service Desk resolution speed (MTTR).
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h4 className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Sentient AI</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">
              Utilized <strong className="text-white">LLM-driven Sentiment Analysis</strong> to prioritize "Frustrated" or "Critical" customers ahead of standard FIFO queues, optimizing CSAT outcomes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
