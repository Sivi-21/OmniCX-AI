
import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  MessageSquare, 
  Bot, 
  BarChart3, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Cpu,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-900 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">OmniCX <span className="text-indigo-600">AI</span></span>
        </motion.div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          <button onClick={() => document.getElementById('intelligence')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors cursor-pointer">Intelligence</button>
          <button onClick={() => document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors cursor-pointer">Ecosystem</button>
          <button onClick={() => document.getElementById('enterprise')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors cursor-pointer">Enterprise</button>
        </div>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onGetStarted}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95"
        >
          Launch Console
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-24 pb-32 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full -z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-12 border border-slate-200 dark:border-slate-800"
        >
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span className="text-indigo-600">v2.5</span>
          Next-Gen AI Omnichannel Platform
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white leading-[0.85] mb-12 tracking-tighter"
        >
          The <span className="text-indigo-600">AI-First</span> <br />
          Customer OS.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Centralize your support channels, automate resolutions with LLM-powered intelligence, and deliver world-class customer experiences at scale.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Book a Demo
          </button>
        </motion.div>

        {/* Mock Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-32 relative group"
        >
          <div className="absolute -inset-10 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative border border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 aspect-video flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
            <img 
              src="https://picsum.photos/seed/dashboard/1920/1080?blur=2" 
              alt="Dashboard Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10" 
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex flex-col items-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={onGetStarted}
                className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group/play border border-slate-100 dark:border-slate-700"
              >
                <Play className="w-10 h-10 text-indigo-600 fill-current ml-1" />
              </motion.div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Watch the AI in action</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-40 px-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center mb-32">
            <div className="text-left">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">Engineered for <br /> Excellence.</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">Everything you need to manage customer queries at enterprise scale, powered by state-of-the-art language models.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <Activity className="w-8 h-8 text-indigo-600 mb-4" />
                <p className="text-2xl font-black text-slate-900 dark:text-white">99.9%</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uptime</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
                <Layers className="w-8 h-8 text-violet-600 mb-4" />
                <p className="text-2xl font-black text-slate-900 dark:text-white">50+</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Integrations</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div id="ecosystem" className="scroll-mt-32">
              <FeatureCard 
                icon={Globe} 
                title="Omnichannel Core" 
                desc="Unify Email, Live Chat, Twitter, and Web Forms in one sleek, real-time interface." 
                capabilities={["Real-time Sync", "Unified Inbox", "Cross-channel History"]}
              />
            </div>
            <div id="intelligence" className="scroll-mt-32">
              <FeatureCard 
                icon={Cpu} 
                title="LLM Intelligence" 
                desc="Auto-tag tickets, detect sentiment, and generate professional replies using Gemini AI." 
                capabilities={["Sentiment Analysis", "Auto-Prioritization", "Smart Drafts"]}
              />
            </div>
            <div id="enterprise" className="scroll-mt-32">
              <FeatureCard 
                icon={BarChart3} 
                title="Advanced Analytics" 
                desc="Track MTTR, CSAT, and SLA health with high-fidelity bento-style visualizations." 
                capabilities={["SLA Monitoring", "Agent Performance", "Trend Prediction"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-24 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">OmniCX <span className="text-indigo-600">AI</span></span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Status</a>
        </div>
        <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">© 2025 OmniCX AI Enterprise OS. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: any; title: string; desc: string; capabilities?: string[] }> = ({ icon: Icon, title, desc, capabilities }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-slate-900 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group h-full flex flex-col"
  >
    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-700">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8 flex-1">{desc}</p>
    
    {capabilities && (
      <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
        {capabilities.map(cap => (
          <div key={cap} className="flex items-center gap-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            {cap}
          </div>
        ))}
      </div>
    )}
  </motion.div>
);

export default LandingPage;
