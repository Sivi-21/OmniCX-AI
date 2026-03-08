
import React, { useState, useEffect, useMemo } from 'react';
import { Ticket, Status, Priority, Category, Sentiment, Language, Customer } from '../types';
import { StatusBadge, PriorityBadge, ChannelIcon, SentimentIcon, SLABadge } from './Dashboard';
import { getAISuggestions, translateResponse } from '../services/aiService';
import { MOCK_CUSTOMERS, KNOWLEDGE_BASE } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Trash2, 
  MagicWand, 
  Send, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  DollarSign,
  Globe,
  Languages,
  BookOpen,
  Search,
  ExternalLink,
  Brain,
  History as HistoryIcon,
  RefreshCw,
  Sparkles,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  onUpdate: (id: string, updates: Partial<Ticket>) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onUpdate, onDelete, onBack }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ 
    suggestedResponse: string; 
    summary: string; 
    sentiment: Sentiment; 
    kbKeywords: string[];
    detectedLanguage: string;
    translatedMessage?: string;
  } | null>(null);
  const [replyText, setReplyText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<Language>(Language.ENGLISH);
  const [isTranslating, setIsTranslating] = useState(false);

  const customer = useMemo(() => 
    MOCK_CUSTOMERS.find(c => c.id === ticket.customerId) || MOCK_CUSTOMERS[0]
  , [ticket.customerId]);

  const kbSuggestions = useMemo(() => {
    if (!aiAnalysis) return [];
    return KNOWLEDGE_BASE.filter(kb => 
      aiAnalysis.kbKeywords.some(kw => 
        kb.title.toLowerCase().includes(kw.toLowerCase()) || 
        kb.keywords.some(k => k.toLowerCase().includes(kw.toLowerCase()))
      )
    ).slice(0, 3);
  }, [aiAnalysis]);

  useEffect(() => {
    const fetchAI = async () => {
      setIsAiLoading(true);
      const suggestions = await getAISuggestions(ticket);
      if (suggestions) {
        setAiAnalysis({
          suggestedResponse: suggestions.suggestedResponse,
          summary: suggestions.summary,
          sentiment: suggestions.sentiment as Sentiment,
          kbKeywords: suggestions.kbKeywords || [],
          detectedLanguage: suggestions.detectedLanguage,
          translatedMessage: suggestions.translatedMessage
        });
        
        const updates: Partial<Ticket> = {};
        if (suggestions.sentiment && !ticket.sentiment) {
          updates.sentiment = suggestions.sentiment as Sentiment;
        }
        if (suggestions.translatedMessage && !ticket.translatedMessage) {
          updates.translatedMessage = suggestions.translatedMessage;
        }
        if (Object.keys(updates).length > 0) {
          onUpdate(ticket.id, updates);
        }
      }
      setIsAiLoading(false);
    };

    if (ticket.message.length > 5) {
      fetchAI();
    }
  }, [ticket.id]);

  const handleStatusChange = (newStatus: Status) => {
    const newHistory = [
      ...ticket.history,
      { id: Date.now().toString(), action: `Status changed to ${newStatus}`, timestamp: new Date().toISOString(), user: 'SIVAGAMI R' }
    ];
    onUpdate(ticket.id, { status: newStatus, history: newHistory });
  };

  const useSuggestedReply = () => {
    if (aiAnalysis) setReplyText(aiAnalysis.suggestedResponse);
  };

  const handleTranslateReply = async () => {
    if (!replyText) return;
    setIsTranslating(true);
    const translated = await translateResponse(replyText, targetLanguage);
    setReplyText(translated || replyText);
    setIsTranslating(false);
  };

  const handleSendReply = () => {
    const newHistory = [
      ...ticket.history,
      { id: Date.now().toString(), action: `Reply sent in ${targetLanguage}: "${replyText.substring(0, 30)}..."`, timestamp: new Date().toISOString(), user: 'SIVAGAMI R' }
    ];
    onUpdate(ticket.id, { status: Status.RESOLVED, history: newHistory });
    onBack();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 transition-colors">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        <div className="flex items-center gap-8">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all border border-slate-100 dark:border-slate-700 group shadow-sm"
          >
            <ArrowLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-2">{ticket.subject}</h2>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{ticket.id}</span>
              <div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <SLABadge deadline={ticket.slaDeadline} priority={ticket.priority} status={ticket.status} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <SentimentIcon sentiment={ticket.sentiment || aiAnalysis?.sentiment} />
          <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 mx-2"></div>
          <StatusBadge status={ticket.status} />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(ticket.id)}
            className="w-14 h-14 rounded-2xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center justify-center transition-all group border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20"
          >
            <Trash2 className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Left Column: Conversation & Reply */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors"
          >
            <div className="p-12 flex-1">
              <div className="flex items-start gap-8 mb-12">
                <div className="relative group/avatar">
                  <img 
                    src={customer.avatar} 
                    className="w-20 h-20 rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl object-cover group-hover/avatar:scale-105 transition-transform"
                    alt={customer.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-lg">
                    <ChannelIcon channel={ticket.channel} />
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] rounded-tl-none relative shadow-sm group hover:border-indigo-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-slate-900 dark:text-slate-100">{ticket.customerName}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-60">&lt;{ticket.customerEmail}&gt;</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-8">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg font-bold">{ticket.message}</p>
                    {aiAnalysis?.translatedMessage && (
                      <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> AI Intelligence Translation
                          </p>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">English (US)</span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed font-bold">
                          {aiAnalysis.translatedMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Response Editor */}
              <div className="mt-12 border-t border-slate-100 dark:border-slate-800 pt-12">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-indigo-500" /> Drafting Enterprise Response
                  </h3>
                  <div className="flex items-center gap-4">
                    {aiAnalysis && (
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={useSuggestedReply}
                        className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 group"
                      >
                        <Brain className="w-5 h-5 group-hover:scale-110 transition-transform" /> Use AI Draft
                      </motion.button>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <textarea 
                    rows={10}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Enter your professional response..."
                    className="w-full border-slate-200 dark:border-slate-800 border-2 rounded-[3rem] p-10 text-lg focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all outline-none bg-transparent dark:text-slate-200 font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  ></textarea>
                  
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <select 
                          value={targetLanguage}
                          onChange={(e) => setTargetLanguage(e.target.value as Language)}
                          className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-6 py-3.5 text-[10px] font-black text-slate-600 dark:text-slate-400 outline-none appearance-none cursor-pointer hover:border-indigo-500/30 transition-all uppercase tracking-[0.2em] shadow-sm"
                        >
                          <option value={Language.ENGLISH}>English</option>
                          <option value={Language.SPANISH}>Spanish</option>
                          <option value={Language.FRENCH}>French</option>
                          <option value={Language.GERMAN}>German</option>
                          <option value={Language.JAPANESE}>Japanese</option>
                        </select>
                      </div>
                      <button 
                        onClick={handleTranslateReply}
                        disabled={!replyText || isTranslating}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-50 flex items-center gap-3"
                      >
                        {isTranslating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                        {isTranslating ? 'Translating...' : 'Translate Reply'}
                      </button>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendReply}
                      disabled={!replyText}
                      className="px-12 py-5 rounded-[2rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-2xl shadow-indigo-500/30 dark:shadow-none transition-all disabled:opacity-50 flex items-center gap-4 group"
                    >
                      <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Dispatch & Resolve
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: AI Sidebar & Customer 360 */}
        <div className="lg:col-span-4 space-y-10">
          {/* Customer 360 Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm transition-colors group hover:border-indigo-500/30"
          >
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <User className="w-4 h-4 text-indigo-500" /> Customer 360° Profile
            </h4>
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="relative group/avatar">
                  <img src={customer.avatar} className="w-24 h-24 rounded-[2rem] object-cover border-4 border-slate-50 dark:border-slate-800 group-hover/avatar:scale-105 transition-transform shadow-lg shadow-slate-200/50 dark:shadow-none" alt="" referrerPolicy="no-referrer" />
                  <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl border-4 border-white dark:border-slate-900 flex items-center justify-center text-[11px] font-black text-white shadow-xl ${customer.healthScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                    {customer.healthScore}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900 dark:text-white mb-1 leading-none">{customer.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{customer.tier} Tier Partner</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Lifetime Value</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{customer.lifetimeValue}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Total Tickets</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{customer.totalTickets}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {customer.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Intelligence Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:scale-150"></div>
            <div className="relative z-10 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 border border-indigo-400/30">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em]">AI Intelligence</h4>
                </div>
                {isAiLoading && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCw className="w-6 h-6 text-indigo-400" /></motion.div>}
              </div>

              {aiAnalysis ? (
                <div className="space-y-10">
                  <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-4">Intent Summary</p>
                    <p className="text-sm text-slate-300 leading-relaxed italic font-bold">"{aiAnalysis.summary}"</p>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.3em] flex items-center gap-3">
                      <BookOpen className="w-4 h-4" /> Knowledge Base Match
                    </p>
                    <div className="space-y-4">
                      {kbSuggestions.map(kb => (
                        <div key={kb.id} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer group/kb hover:scale-[1.02] shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <p className="text-xs font-black text-slate-200 group-hover/kb:text-indigo-300 transition-colors uppercase tracking-tight">{kb.title}</p>
                            <ChevronRight className="w-4 h-4 text-slate-500 group-hover/kb:translate-x-1 transition-transform" />
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-bold">{kb.content}</p>
                        </div>
                      ))}
                      {kbSuggestions.length === 0 && (
                        <p className="text-[10px] text-slate-500 italic font-bold uppercase tracking-widest text-center py-4">No direct KB matches found.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Sparkles className="w-10 h-10 text-slate-700 mb-6 animate-pulse" />
                  <p className="text-[10px] text-slate-500 italic font-black uppercase tracking-[0.3em]">Waiting for signal analysis...</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Audit Trail / Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-10 shadow-sm flex flex-col h-[480px] transition-colors group hover:border-indigo-500/30"
          >
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
              <HistoryIcon className="w-4 h-4 text-indigo-500" /> Activity & Audit Trail
            </h4>
            <div className="flex-1 overflow-y-auto pr-4 space-y-10 relative scrollbar-hide">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-100 dark:bg-slate-800"></div>
              {ticket.history.map((log, idx) => (
                <div key={log.id} className="relative pl-12 group/item">
                  <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 z-10 group-hover/item:scale-125 transition-transform shadow-sm"></div>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors leading-tight">{log.action}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{log.user}</p>
                    <div className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <button className="w-full py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30">
                <CheckCircle2 className="w-4 h-4" /> View Full History
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
