
import React, { useState, useEffect } from 'react';
import { Ticket, Channel, Category, Priority, Status, TicketHistory } from '../types';
import { processTicketWithRules } from '../services/aiService';
import { MOCK_CUSTOMERS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Headset, 
  User, 
  Mail, 
  Globe, 
  Tag, 
  MessageSquare, 
  Send, 
  X,
  Brain,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  AlertCircle,
  Plus
} from 'lucide-react';

interface TicketFormProps {
  onSubmit: (ticket: Ticket) => void;
  onCancel: () => void;
  initialCustomerId?: string;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, onCancel, initialCustomerId }) => {
  const [useAi, setUseAi] = useState(true);
  const [formData, setFormData] = useState({
    customerId: initialCustomerId || '',
    customerName: '',
    customerEmail: '',
    channel: Channel.WEB_FORM,
    category: Category.TECHNICAL,
    priority: Priority.MEDIUM,
    subject: '',
    message: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  // Auto-fill customer details if customerId changes
  useEffect(() => {
    if (formData.customerId) {
      const customer = MOCK_CUSTOMERS.find(c => c.id === formData.customerId);
      if (customer) {
        setFormData(prev => ({
          ...prev,
          customerName: customer.name,
          customerEmail: customer.email
        }));
      }
    }
  }, [formData.customerId]);

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalPriority = formData.priority;
    let finalTags = formData.tags;

    if (useAi) {
      const aiResult = processTicketWithRules(formData.message);
      finalPriority = aiResult.priority;
      finalTags = [...new Set([...finalTags, ...aiResult.tags])];
    }

    // Industry SLA Logic: Urgent = 4h, High = 12h, Medium = 24h, Low = 48h
    const slaHours = finalPriority === Priority.URGENT ? 4 : 
                     finalPriority === Priority.HIGH ? 12 : 
                     finalPriority === Priority.MEDIUM ? 24 : 48;
    
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + slaHours);

    const initialHistory: TicketHistory[] = [
      { id: Date.now().toString(), action: 'Ticket Created Manually', timestamp: new Date().toISOString(), user: 'SIVAGAMI R' },
      { id: (Date.now() + 1).toString(), action: `Assigned Priority: ${finalPriority}`, timestamp: new Date().toISOString(), user: useAi ? 'AI Engine' : 'SIVAGAMI R' }
    ];

    const newTicket: Ticket = {
      id: `T-${Math.floor(Math.random() * 90000) + 10000}`,
      customerId: formData.customerId || 'C-001',
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      channel: formData.channel,
      category: formData.category,
      status: Status.OPEN,
      priority: finalPriority,
      subject: formData.subject,
      message: formData.message,
      tags: finalTags,
      slaDeadline: deadline.toISOString(),
      history: initialHistory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(newTicket);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        <div className="bg-indigo-600 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Headset className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Manual Intake Mode</span>
                  <span className="text-xs font-bold text-indigo-200">Enterprise Ticket Creation</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setUseAi(!useAi)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${useAi ? 'bg-white text-indigo-600 border-white' : 'bg-transparent text-white border-white/30'}`}
              >
                {useAi ? <Sparkles className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                {useAi ? 'AI Assist Active' : 'Manual Override'}
              </button>
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-4">Manual Case Creation</h2>
            <p className="text-indigo-100 font-medium opacity-80 max-w-md leading-relaxed">
              {useAi 
                ? "AI will automatically analyze your input to suggest priority and tags." 
                : "Manual mode enabled. You have full control over all ticket parameters."}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-12 space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <User className="w-3 h-3 text-indigo-500" /> Select Customer
              </label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200 cursor-pointer appearance-none"
                value={formData.customerId}
                onChange={e => setFormData({...formData, customerId: e.target.value})}
              >
                <option value="">-- New Customer --</option>
                {MOCK_CUSTOMERS.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
              </select>
            </div>
            {!formData.customerId && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <User className="w-3 h-3 text-indigo-500" /> Customer Name
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200"
                  placeholder="Full Name"
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
            )}
            {!formData.customerId && (
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <Mail className="w-3 h-3 text-indigo-500" /> Contact Email
                </label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200"
                  placeholder="Email Address"
                  value={formData.customerEmail}
                  onChange={e => setFormData({...formData, customerEmail: e.target.value})}
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Globe className="w-3 h-3 text-indigo-500" /> Origin Source
              </label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200 cursor-pointer appearance-none"
                value={formData.channel}
                onChange={e => setFormData({...formData, channel: e.target.value as Channel})}
              >
                {Object.values(Channel).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Tag className="w-3 h-3 text-indigo-500" /> Classification
              </label>
              <select 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200 cursor-pointer appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <AlertCircle className="w-3 h-3 text-indigo-500" /> Priority Level
              </label>
              <select 
                disabled={useAi}
                className={`w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200 cursor-pointer appearance-none ${useAi ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
              >
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
              <MessageSquare className="w-3 h-3 text-indigo-500" /> Subject Header
            </label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-black text-sm dark:text-slate-200"
              placeholder="Brief summary of the request"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck className="w-3 h-3 text-indigo-500" /> Message Content
              </label>
              {useAi && (
                <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
                  <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
                  <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest">AI Scrutiny Active</span>
                </div>
              )}
            </div>
            <textarea 
              required
              rows={6}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] px-6 py-6 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium text-sm leading-relaxed dark:text-slate-200"
              placeholder={useAi ? "Describe the issue in detail. Our AI will automatically detect sentiment and priority..." : "Enter the detailed message here..."}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          {!useAi && (
            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                <Tag className="w-3 h-3 text-indigo-500" /> Manual Tags
              </label>
              <div className="flex flex-wrap gap-3 mb-4">
                <AnimatePresence>
                  {formData.tags.map(tag => (
                    <motion.span 
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-rose-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-4">
                <input 
                  type="text"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a custom tag..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-slate-200"
                />
                <button 
                  type="button"
                  onClick={handleAddTag}
                  className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-indigo-500 hover:text-white transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-end gap-6 border-t border-slate-100 dark:border-slate-800">
            <button 
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto text-[10px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <X className="w-4 h-4" /> Discard Request
            </button>
            <button 
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-500/20 dark:shadow-none transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group"
            >
              <Zap className="w-4 h-4 group-hover:fill-current" /> Generate Case <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TicketForm;
